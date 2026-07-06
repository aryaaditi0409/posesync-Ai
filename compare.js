// ===========================================
// Pose Comparison Engine
// ===========================================

const VISIBILITY_THRESHOLD = 0.5;
const MAX_EXPECTED_DISTANCE = 0.30;

const LANDMARK_NAMES = {
  0: "Nose",

  11: "Left Shoulder",
  12: "Right Shoulder",

  13: "Left Elbow",
  14: "Right Elbow",

  15: "Left Wrist",
  16: "Right Wrist",

  23: "Left Hip",
  24: "Right Hip",

  25: "Left Knee",
  26: "Right Knee",

  27: "Left Ankle",
  28: "Right Ankle",

  29: "Left Heel",
  30: "Right Heel",

  31: "Left Foot",
  32: "Right Foot"
};

const JOINT_WEIGHTS = {
  11: 2,
  12: 2,

  13: 2.5,
  14: 2.5,

  15: 3,
  16: 3,

  23: 2,
  24: 2,

  25: 2.5,
  26: 2.5,

  27: 3,
  28: 3
};

// ------------------------------------------
// Normalize landmarks
// ------------------------------------------

function normalizeLandmarks(landmarks) {

    const leftHip = landmarks[23];
    const rightHip = landmarks[24];

    const centerX = (leftHip.x + rightHip.x) / 2;
    const centerY = (leftHip.y + rightHip.y) / 2;

    return landmarks.map(point => ({
        x: point.x - centerX,
        y: point.y - centerY,
        visibility: point.visibility ?? 1
    }));

}

// ------------------------------------------
// Distance
// ------------------------------------------

function distance(a, b){

    return Math.sqrt(

        (a.x - b.x) ** 2 +

        (a.y - b.y) ** 2

    );

}
// ------------------------------------------
// Compare landmarks
// ------------------------------------------

function compareLandmarks(reference, live){

    const ref = normalizeLandmarks(reference);

    const current = normalizeLandmarks(live);

    let comparisons = [];

    for(let i = 0; i < 33; i++){

        if(
            ref[i].visibility < VISIBILITY_THRESHOLD ||
            current[i].visibility < VISIBILITY_THRESHOLD
        ){
            continue;
        }

        comparisons.push({

            index: i,

            joint: LANDMARK_NAMES[i] || `Joint ${i}`,

            distance: distance(ref[i], current[i]),

            weight: JOINT_WEIGHTS[i] || 1

        });

    }

    return comparisons;

}


// ------------------------------------------
// Calculate similarity score
// ------------------------------------------

function calculateScore(comparisons){

    if(comparisons.length === 0){

        return 0;

    }

    let weightedDistance = 0;

    let totalWeight = 0;

    comparisons.forEach(item => {

        weightedDistance += item.distance * item.weight;

        totalWeight += item.weight;

    });

    const averageDistance = weightedDistance / totalWeight;

    let score = (

        1 -

        (averageDistance / MAX_EXPECTED_DISTANCE)

    ) * 100;

    score = Math.max(0, Math.min(100, score));

    return Number(score.toFixed(2));

}


// ------------------------------------------
// Find worst joints
// ------------------------------------------

function getWorstJoints(comparisons){

    return comparisons

        .sort((a,b)=>

            (b.distance*b.weight)

            -

            (a.distance*a.weight)

        )

        .slice(0,3);

}
// ------------------------------------------
// Direction helper
// ------------------------------------------

function getDirection(reference, live) {

    const dx = reference.x - live.x;
    const dy = reference.y - live.y;

    const THRESHOLD = 0.03;

    const directions = [];

    // Y-axis
    if (dy > THRESHOLD) {
        directions.push("Raise");
    } else if (dy < -THRESHOLD) {
        directions.push("Lower");
    }

    // X-axis
    if (dx > THRESHOLD) {
        directions.push("Move Left");
    } else if (dx < -THRESHOLD) {
        directions.push("Move Right");
    }

    return directions;

}


// ------------------------------------------
// Generate feedback
// ------------------------------------------

function generateFeedback(reference, live, mistakes){

    const ref = normalizeLandmarks(reference);
    const current = normalizeLandmarks(live);

    return mistakes.map(mistake => {

        const directions = getDirection(

            ref[mistake.index],

            current[mistake.index]

        );

        if(directions.length === 0){

            return `Adjust your ${mistake.joint}.`;

        }

        if(directions.length === 1){

            return `${directions[0]} your ${mistake.joint}.`;

        }

        return `${directions[0]} and ${directions[1]} your ${mistake.joint}.`;

    });

}


// ------------------------------------------
// Main comparison function
// ------------------------------------------

export function comparePose(referenceLandmarks, liveLandmarks){

    if(!referenceLandmarks || !liveLandmarks){

        return {

            score: 0,

            worstJoints: [],

            feedback: ["Waiting for pose data..."]

        };

    }

    if(referenceLandmarks.length !== 33 || liveLandmarks.length !== 33){

        return {

            score: 0,

            worstJoints: [],

            feedback: ["Invalid landmark data."]

        };

    }

    const comparisons = compareLandmarks(

        referenceLandmarks,

        liveLandmarks

    );

    const score = calculateScore(comparisons);

    const worst = getWorstJoints(comparisons);

    const feedback = generateFeedback(

        referenceLandmarks,

        liveLandmarks,

        worst

    );

    return {

        score,

        worstJoints: worst.map(item => item.joint),

        feedback

    };

}
