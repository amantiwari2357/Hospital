import json
import base64
import numpy as np
import cv2
import sys
import random

# Mocking the functions to test logic in isolation
def analyze_skin_features(img, skin_mask, real_diseases):
    skin_pixels_count = cv2.countNonZero(skin_mask)
    if skin_pixels_count == 0:
        return {"error": "zero skin"}

    dominant_color = "neutral"
    laplacian_var = 100
    red_perc = 1.0
    brown_perc = 1.0
    white_perc = 1.0

    scored_matches = []
    for d in real_diseases:
        name = d.get('name', '').lower()
        score = 0
        if dominant_color == "red" and any(w in name for w in ['acne']): score += 50
        scored_matches.append((score, d))

    scored_matches.sort(key=lambda x: x[0], reverse=True)
    
    if not scored_matches or scored_matches[0][0] == 0:
        best_match = {"name": "Audit"}
        match_score = 0
    else:
        best_match = scored_matches[0][1]
        match_score = scored_matches[0][0]
    
    return {"condition": best_match.get('name')}

# Test case: Empty real_diseases
img = np.zeros((100, 100, 3), dtype=np.uint8)
mask = np.ones((100, 100), dtype=np.uint8) * 255
diseases = []

try:
    res = analyze_skin_features(img, mask, diseases)
    print("Success:", res)
except Exception as e:
    print("Failed:", str(e))
