// =========================================
// PoseSync - Pose Comparison Engine V2
// =========================================

// -----------------------------------------
// SETTINGS
// -----------------------------------------

const VISIBILITY_THRESHOLD = 0.5;

const MAX_DISTANCE = 0.02;

// Only compare important body joints
const IMPORTANT_JOINTS = [
    11, 12, // shoulders
    13, 14, // elbows
    15, 16, // wrists
    23, 24, // hips
    25, 26, // knees
    27, 28  // ankles
];

// Higher = more important
const JOINT_WEIGHTS = {

    11:2,
    12:2,

    13:3,
    14:3,

    15:4,
    16:4,

    23:2,
    24:2,

    25:3,
    26:3,

    27:4,
    28:4

};

const LANDMARK_NAMES = {

    11:"Left Shoulder",
    12:"Right Shoulder",

    13:"Left Elbow",
    14:"Right Elbow",

    15:"Left Wrist",
    16:"Right Wrist",

    23:"Left Hip",
    24:"Right Hip",

    25:"Left Knee",
    26:"Right Knee",

    27:"Left Ankle",
    28:"Right Ankle"

};

// -----------------------------------------
// Distance
// -----------------------------------------

function distance(a,b){

    return Math.sqrt(

        (a.x-b.x)**2 +

        (a.y-b.y)**2

    );

}

// -----------------------------------------
// Torso length
// -----------------------------------------

function torsoLength(landmarks){

    const leftShoulder = landmarks[11];

    const rightShoulder = landmarks[12];

    const leftHip = landmarks[23];

    const rightHip = landmarks[24];

    const shoulderCenter = {

        x:(leftShoulder.x+rightShoulder.x)/2,

        y:(leftShoulder.y+rightShoulder.y)/2

    };

    const hipCenter = {

        x:(leftHip.x+rightHip.x)/2,

        y:(leftHip.y+rightHip.y)/2

    };

    return distance(

        shoulderCenter,

        hipCenter

    );

}

// -----------------------------------------
// Normalize Pose
// -----------------------------------------

function normalizeLandmarks(landmarks){

    const leftHip = landmarks[23];

    const rightHip = landmarks[24];

    const centerX =

        (leftHip.x+rightHip.x)/2;

    const centerY =

        (leftHip.y+rightHip.y)/2;

    const scale = torsoLength(landmarks);

    return landmarks.map(point=>({

        x:(point.x-centerX)/scale,

        y:(point.y-centerY)/scale,

        visibility:point.visibility ?? 1

    }));

}

// -----------------------------------------
// Landmark validation
// -----------------------------------------

function validPose(landmarks){

    if(!landmarks) return false;

    if(landmarks.length!==33) return false;

    return true;

}
// =========================================
// ANGLE CALCULATIONS
// =========================================

// Returns the angle ABC in degrees
function calculateAngle(a, b, c) {

    const AB = {
        x: a.x - b.x,
        y: a.y - b.y
    };

    const CB = {
        x: c.x - b.x,
        y: c.y - b.y
    };

    const dot = (AB.x * CB.x) + (AB.y * CB.y);

    const magAB = Math.sqrt(AB.x * AB.x + AB.y * AB.y);
    const magCB = Math.sqrt(CB.x * CB.x + CB.y * CB.y);

    if (magAB === 0 || magCB === 0) return 0;

    let cosine = dot / (magAB * magCB);

    cosine = Math.max(-1, Math.min(1, cosine));

    return Math.acos(cosine) * 180 / Math.PI;

}

// -----------------------------------------
// Body angles we care about
// -----------------------------------------

function getPoseAngles(landmarks){

    return {

        leftArm:
            calculateAngle(
                landmarks[11],
                landmarks[13],
                landmarks[15]
            ),

        rightArm:
            calculateAngle(
                landmarks[12],
                landmarks[14],
                landmarks[16]
            ),

        leftLeg:
            calculateAngle(
                landmarks[23],
                landmarks[25],
                landmarks[27]
            ),

        rightLeg:
            calculateAngle(
                landmarks[24],
                landmarks[26],
                landmarks[28]
            ),

        leftTorso:
            calculateAngle(
                landmarks[11],
                landmarks[23],
                landmarks[25]
            ),

        rightTorso:
            calculateAngle(
                landmarks[12],
                landmarks[24],
                landmarks[26]
            )

    };

}

// -----------------------------------------
// Compare all angles
// -----------------------------------------

function compareAngles(reference, live){

    const refAngles = getPoseAngles(reference);

    const liveAngles = getPoseAngles(live);

    let totalDifference = 0;

    let count = 0;

    const mistakes = [];

    for(const joint in refAngles){

        const difference = Math.abs(

            refAngles[joint] -

            liveAngles[joint]

        );

        totalDifference += difference;

        count++;

        mistakes.push({

            joint,

            difference

        });

    }

    mistakes.sort(

        (a,b)=>b.difference-a.difference

    );

    return {

        averageDifference:

            totalDifference/count,

        mistakes

    };

}
// =========================================
// LANDMARK DISTANCE COMPARISON
// =========================================

function compareLandmarks(reference, live){

    const ref = normalizeLandmarks(reference);

    const current = normalizeLandmarks(live);

    let totalDistance = 0;

    let totalWeight = 0;

    const mistakes = [];

    for(const index of IMPORTANT_JOINTS){

        if(
            ref[index].visibility < VISIBILITY_THRESHOLD ||
            current[index].visibility < VISIBILITY_THRESHOLD
        ){
            continue;
        }

        const d = distance(

            ref[index],

            current[index]

        );

        const weight = JOINT_WEIGHTS[index];

        totalDistance += d * weight;

        totalWeight += weight;

        mistakes.push({

            index,

            joint: LANDMARK_NAMES[index],

            distance: d

        });

    }

    mistakes.sort(

        (a,b)=>b.distance-a.distance

    );

    return {

        averageDistance:

            totalDistance / totalWeight,

        mistakes

    };

}

// =========================================
// SCORE CALCULATION
// =========================================

function calculateScore(angleDiff, landmarkDiff){

    // ---------- ANGLES ----------

    let angleScore =

        100 -

        (angleDiff / 90) * 100;

    angleScore = Math.max(

        0,

        Math.min(100, angleScore)

    );

    // ---------- LANDMARKS ----------

    let landmarkScore =

        100 -

        (landmarkDiff / MAX_DISTANCE) * 100;

    landmarkScore = Math.max(

        0,

        Math.min(100, landmarkScore)

    );

    // ---------- COMBINED SCORE ----------

    let score =

        (0.85 * angleScore) +

        (0.15 * landmarkScore);

    // ---------- STRICTER SCORING ----------

    if(score > 90){

        score =

            90 +

            (score-90)*0.5;

    }

    else if(score > 70){

        score =

            70 +

            (score-70)*0.7;

    }

    else if(score > 50){

        score =

            50 +

            (score-50)*0.8;

    }

    return Number(

        score.toFixed(2)

    );

}
