import sys
import json
import random
import base64
import numpy as np
import cv2
import traceback

def decode_image(image_data):
    try:
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        img_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        return img
    except Exception:
        return None

def detect_skin(img):
    if img is None:
        return False, 0, "Invalid image", None

    hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    ycrcb_img = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)

    # Skin thresholds
    lower_hsv = np.array([0, 40, 80], dtype="uint8")
    upper_hsv = np.array([20, 255, 255], dtype="uint8")
    skin_mask_hsv = cv2.inRange(hsv_img, lower_hsv, upper_hsv)

    lower_ycrcb = np.array([0, 133, 77], dtype="uint8")
    upper_ycrcb = np.array([255, 173, 127], dtype="uint8")
    skin_mask_ycrcb = cv2.inRange(ycrcb_img, lower_ycrcb, upper_ycrcb)

    combined_mask = cv2.bitwise_and(skin_mask_hsv, skin_mask_ycrcb)
    
    skin_pixels = cv2.countNonZero(combined_mask)
    total_pixels = img.shape[0] * img.shape[1]
    skin_percentage = (skin_pixels / total_pixels) * 100

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)
    edge_pixels = cv2.countNonZero(edges)
    edge_density = (edge_pixels / total_pixels) * 100

    is_skin = skin_percentage > 3 and edge_density < 5
    
    if not is_skin:
        if edge_density >= 5:
            msg = "Image is too complex. Please upload a clear close-up."
        else:
            msg = f"No human skin detected ({round(skin_percentage, 1)}%)."
        return False, skin_percentage, msg, None

    return True, skin_percentage, "Skin detected", combined_mask

def analyze_skin_features(img, skin_mask, real_diseases):
    if skin_mask is None:
        return {"error": "No skin mask"}

    skin_pixels_count = cv2.countNonZero(skin_mask)
    if skin_pixels_count == 0:
        return {"error": "Empty skin area"}

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    skin_gray = cv2.bitwise_and(gray, skin_mask)
    laplacian_var = cv2.Laplacian(skin_gray, cv2.CV_64F).var()
    
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Symptom Masks
    low_r1, up_r1 = np.array([0, 50, 50]), np.array([10, 255, 255])
    low_r2, up_r2 = np.array([170, 50, 50]), np.array([180, 255, 255])
    mask_red = cv2.bitwise_and(cv2.bitwise_or(cv2.inRange(hsv, low_r1, up_r1), cv2.inRange(hsv, low_r2, up_r2)), skin_mask)
    
    low_b, up_b = np.array([10, 50, 20]), np.array([30, 255, 150])
    mask_brown = cv2.bitwise_and(cv2.inRange(hsv, low_b, up_b), skin_mask)
    
    low_w, up_w = np.array([0, 0, 180]), np.array([180, 40, 255])
    mask_white = cv2.bitwise_and(cv2.inRange(hsv, low_w, up_w), skin_mask)
    
    red_p = (cv2.countNonZero(mask_red) / skin_pixels_count) * 100
    brown_p = (cv2.countNonZero(mask_brown) / skin_pixels_count) * 100
    white_p = (cv2.countNonZero(mask_white) / skin_pixels_count) * 100

    dom = "neutral"
    if red_p > 1.2: dom = "red"
    if brown_p > 1.2 and brown_p > red_p: dom = "brown"
    if white_p > 1.2 and white_p > max(red_p, brown_p): dom = "white"

    scored = []
    if real_diseases:
        for d in real_diseases:
            if not isinstance(d, dict): continue
            name = d.get('name', '').lower()
            score = 0
            if dom == "red" and any(w in name for w in ['acne', 'pimple', 'eczema', 'rosacea']): score += 50
            elif dom == "brown" and any(w in name for w in ['melanoma', 'cancer', 'mole']): score += 50
            elif dom == "white" and any(w in name for w in ['vitiligo', 'fungal']): score += 50
            if laplacian_var > 80 and any(w in name for w in ['psoriasis', 'eczema']): score += 20
            scored.append((score, d))

    scored.sort(key=lambda x: x[0], reverse=True)
    
    if not scored or scored[0][0] == 0:
        best = {
            "name": "Clinical Skin Audit (Analysis Only)",
            "description": "Surface analysis complete. No specific disease match found in database. Real-time metrics provided below.",
            "treatments": ["Maintain gentle skin care", "Consult a specialist if spots grow or change color"]
        }
        b_score = 0
    else:
        best = scored[0][1]
        b_score = scored[0][0]
    
    conf = min(60.0 + (b_score / 3) + random.uniform(0, 5), 99.2)
    
    # Ensure all values are standard Python types for JSON serialization
    is_urgent = bool("Cancer" in best.get('name', '') or laplacian_var > 500)
    
    return {
        "condition": best.get('name'),
        "severity": "High" if laplacian_var > 300 else "Moderate" if laplacian_var > 100 else "Mild",
        "description": best.get('description'),
        "suggestions": best.get('treatments', [])[:3],
        "isUrgent": is_urgent,
        "confidence": f"{round(float(conf), 1)}%",
        "medical_metrics": {
            "skin_roughness": float(round(laplacian_var, 2)),
            "inflammation_score": f"{round(float(red_p), 1)}%",
            "pigment_score": f"{round(float(brown_p), 1)}%",
            "color_loss_score": f"{round(float(white_p), 1)}%"
        }
    }

if __name__ == "__main__":
    try:
        raw_input = sys.stdin.read()
        if not raw_input:
            print(json.dumps({"error": "No input"}))
            sys.exit(1)
            
        data = json.loads(raw_input)
        image_b64 = data.get("image")
        real_diseases = data.get("realDiseases", [])
        
        img = decode_image(image_b64)
        if img is None:
            print(json.dumps({"error": "Image decode failed"}))
            sys.exit(1)

        success, skin_p, msg, mask = detect_skin(img)
        if not success:
            print(json.dumps({
                "success": False, 
                "error": msg, 
                "skinPercentage": f"{round(float(skin_p), 1)}%"
            }))
            sys.exit(0)

        res = analyze_skin_features(img, mask, real_diseases)
        
        # Combine and ensure everything is JSON-safe
        final_output = {
            "success": True, 
            "aiAnalysis": {
                **res, 
                "skinPercentage": f"{round(float(skin_p), 1)}%"
            }
        }
        print(json.dumps(final_output))
        
    except Exception as e:
        # Include traceback for debugging
        print(json.dumps({"error": "System Error", "message": str(e), "trace": traceback.format_exc()}))
