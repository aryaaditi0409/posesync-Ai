"""
compare.py

Pose comparison engine for PoseSync.

This module compares two sets of MediaPipe pose landmarks
(reference pose + live pose) and returns:

- Match score
- Worst matching joints
- Feedback

Supports BOTH:

1. Raw MediaPipe landmarks
2. Dictionary landmarks

Author: PoseSync Team
"""

import math
from typing import List, Dict, Any

# -----------------------------
# SETTINGS
# -----------------------------

VISIBILITY_THRESHOLD = 0.5

# Higher weight = more important
JOINT_WEIGHTS = {
    0: 0.3,     # Nose

    11: 2.0,    # Left Shoulder
    12: 2.0,    # Right Shoulder

    13: 2.5,    # Left Elbow
    14: 2.5,    # Right Elbow

    15: 3.0,    # Left Wrist
    16: 3.0,    # Right Wrist

    23: 2.0,    # Left Hip
    24: 2.0,    # Right Hip

    25: 2.5,    # Left Knee
    26: 2.5,    # Right Knee

    27: 3.0,    # Left Ankle
    28: 3.0,    # Right Ankle
}

DEFAULT_WEIGHT = 1.0

# -----------------------------
# Landmark names
# -----------------------------

LANDMARK_NAMES = {
    0: "Nose",
    1: "Left Eye Inner",
    2: "Left Eye",
    3: "Left Eye Outer",
    4: "Right Eye Inner",
    5: "Right Eye",
    6: "Right Eye Outer",
    7: "Left Ear",
    8: "Right Ear",
    9: "Mouth Left",
    10: "Mouth Right",
    11: "Left Shoulder",
    12: "Right Shoulder",
    13: "Left Elbow",
    14: "Right Elbow",
    15: "Left Wrist",
    16: "Right Wrist",
    17: "Left Pinky",
    18: "Right Pinky",
    19: "Left Index",
    20: "Right Index",
    21: "Left Thumb",
    22: "Right Thumb",
    23: "Left Hip",
    24: "Right Hip",
    25: "Left Knee",
    26: "Right Knee",
    27: "Left Ankle",
    28: "Right Ankle",
    29: "Left Heel",
    30: "Right Heel",
    31: "Left Foot Index",
    32: "Right Foot Index",
}

# -----------------------------
# Helper functions
# -----------------------------

def extract_landmark_data(landmark):
    """
    Works with BOTH:

    Dictionary:
    {
        "x":...,
        "y":...,
        "z":...,
        "visibility":...
    }

    Raw MediaPipe landmark object.
    """

    if isinstance(landmark, dict):
        return (
            landmark["x"],
            landmark["y"],
            landmark.get("visibility", 1.0)
        )

    return (
        landmark.x,
        landmark.y,
        landmark.visibility
    )


def validate_landmarks(reference, live):
    """
    Ensures both landmark lists contain 33 landmarks.
    """

    if reference is None or live is None:
        raise ValueError("Landmark lists cannot be None.")

    if len(reference) != 33:
        raise ValueError(
            f"Reference pose has {len(reference)} landmarks. Expected 33."
        )

    if len(live) != 33:
        raise ValueError(
            f"Live pose has {len(live)} landmarks. Expected 33."
        )


def get_joint_weight(index):
    """
    Returns importance weight of a landmark.
    """

    return JOINT_WEIGHTS.get(index, DEFAULT_WEIGHT)

# -----------------------------
# Normalization
# -----------------------------

def normalize_landmarks(landmarks):
    """
    Normalize landmarks using the midpoint of the hips.

    This reduces the effect of the person standing
    slightly left/right/up/down in the camera.
    """

    left_hip_x, left_hip_y, _ = extract_landmark_data(landmarks[23])
    right_hip_x, right_hip_y, _ = extract_landmark_data(landmarks[24])

    center_x = (left_hip_x + right_hip_x) / 2
    center_y = (left_hip_y + right_hip_y) / 2

    normalized = []

    for landmark in landmarks:

        x, y, visibility = extract_landmark_data(landmark)

        normalized.append({
            "x": x - center_x,
            "y": y - center_y,
            "visibility": visibility
        })

    return normalized


# -----------------------------
# Distance calculation
# -----------------------------

def point_distance(x1, y1, x2, y2):
    """
    Euclidean distance between two landmarks.
    """

    return math.sqrt(
        (x2 - x1) ** 2 +
        (y2 - y1) ** 2
    )


# -----------------------------
# Compare every landmark
# -----------------------------

def compare_landmarks(reference, live):
    """
    Returns:

    [
        {
            landmark_index,
            landmark_name,
            distance,
            weight
        },
        ...
    ]
    """

    validate_landmarks(reference, live)

    reference = normalize_landmarks(reference)
    live = normalize_landmarks(live)

    comparisons = []

    for i in range(33):

        ref = reference[i]
        cur = live[i]

        if (
            ref["visibility"] < VISIBILITY_THRESHOLD
            or
            cur["visibility"] < VISIBILITY_THRESHOLD
        ):
            continue

        distance = point_distance(
            ref["x"],
            ref["y"],
            cur["x"],
            cur["y"]
        )

        comparisons.append({

            "index": i,

            "joint": LANDMARK_NAMES[i],

            "distance": distance,

            "weight": get_joint_weight(i)

        })

    return comparisons


# -----------------------------
# Overall similarity score
# -----------------------------

def calculate_match(comparisons):
    """
    Returns similarity score between 0 and 100.
    """

    if len(comparisons) == 0:
        return 0.0

    weighted_distance = 0
    total_weight = 0

    for item in comparisons:

        weighted_distance += (
            item["distance"] *
            item["weight"]
        )

        total_weight += item["weight"]

    average_distance = weighted_distance / total_weight

    MAX_EXPECTED_DISTANCE = 0.30

    score = (
        1 -
        (average_distance / MAX_EXPECTED_DISTANCE)
    ) * 100

    score = max(0, min(score, 100))

    return round(score, 2)
# -----------------------------
# Find the worst joints
# -----------------------------

def get_top_mistakes(comparisons, top_n=3):
    """
    Returns the top N joints with the highest weighted error.
    """

    ranked = sorted(
        comparisons,
        key=lambda item: item["distance"] * item["weight"],
        reverse=True
    )

    return ranked[:top_n]


# -----------------------------
# Direction helper
# -----------------------------

def get_direction(reference_joint, live_joint):
    """
    Determines how the user should move the joint.
    """

    dx = reference_joint["x"] - live_joint["x"]
    dy = reference_joint["y"] - live_joint["y"]

    THRESHOLD = 0.03

    directions = []

    # Remember:
    # Smaller y = higher on screen

    if dy < -THRESHOLD:
        directions.append("lower")

    elif dy > THRESHOLD:
        directions.append("raise")

    if dx < -THRESHOLD:
        directions.append("move right")

    elif dx > THRESHOLD:
        directions.append("move left")

    return directions


# -----------------------------
# Feedback generation
# -----------------------------

def generate_feedback(reference, live, mistakes):
    """
    Generates readable feedback.
    """

    reference = normalize_landmarks(reference)
    live = normalize_landmarks(live)

    feedback = []

    for mistake in mistakes:

        index = mistake["index"]

        joint_name = LANDMARK_NAMES[index]

        ref = reference[index]
        cur = live[index]

        directions = get_direction(ref, cur)

        if len(directions) == 0:
            message = f"Adjust your {joint_name.lower()}."

        elif len(directions) == 1:
            message = f"{directions[0].capitalize()} your {joint_name.lower()}."

        else:
            message = (
                f"{directions[0].capitalize()} and "
                f"{directions[1]} your {joint_name.lower()}."
            )

        feedback.append(message)

    return feedback


# -----------------------------
# Main function
# -----------------------------

def compare_pose(reference_landmarks, live_landmarks):
    """
    Main function to compare two poses.

    Returns:

    {
        "score": float,
        "worst_joints": [...],
        "feedback": [...]
    }
    """

    comparisons = compare_landmarks(
        reference_landmarks,
        live_landmarks
    )

    score = calculate_match(comparisons)

    mistakes = get_top_mistakes(comparisons)

    feedback = generate_feedback(
        reference_landmarks,
        live_landmarks,
        mistakes
    )

    return {

        "score": score,

        "worst_joints": [
            item["joint"]
            for item in mistakes
        ],

        "feedback": feedback

    }        
    