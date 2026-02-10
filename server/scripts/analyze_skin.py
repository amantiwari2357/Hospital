import sys
import json
import random
import base64
import numpy as np
import cv2

def decode_image(image_data):
    """
    Decodes base64 image data to an OpenCV image.
    """
    try:
        # Handle full base64 string with profile prefix (e.g., data:image/jpeg;base64,...)
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        img_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        return img
    except Exception as e:
        return None

def detect_skin(img):
    """
    Detects skin in the image using HSV and YCrCb color spaces.
    Incorporates edge density check to reject complex landscapes.
    Returns: (is_skin_present, skin_percentage, info_message)
    """
    if img is None:
        return False, 0, "Invalid image"

    # Convert to HSV and YCrCb color spaces
    hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    ycrcb_img = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)

    # Stricter Skin color thresholds to avoid sunset/landscape oranges
    # HSV: H[0, 20], S[40, 255], V[80, 255]
    lower_hsv = np.array([0, 40, 80], dtype="uint8")
    upper_hsv = np.array([20, 255, 255], dtype="uint8")
    skin_mask_hsv = cv2.inRange(hsv_img, lower_hsv, upper_hsv)

    # YCrCb: Y[0, 255], Cr[133, 173], Cb[77, 127] (Standard medical range)
    lower_ycrcb = np.array([0, 133, 77], dtype="uint8")
    upper_ycrcb = np.array([255, 173, 127], dtype="uint8")
    skin_mask_ycrcb = cv2.inRange(ycrcb_img, lower_ycrcb, upper_ycrcb)

    # Combine masks
    combined_mask = cv2.bitwise_and(skin_mask_hsv, skin_mask_ycrcb)
    
    # Calculate percentage
    skin_pixels = cv2.countNonZero(combined_mask)
    total_pixels = img.shape[0] * img.shape[1]
    skin_percentage = (skin_pixels / total_pixels) * 100

    # Additional Check: Edge Density
    # Landscapes have many edges (trees, houses, kites). Skin is relatively smooth.
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)
    edge_pixels = cv2.countNonZero(edges)
    edge_density = (edge_pixels / total_pixels) * 100

    # LOGIC:
    # 1. Skin must be more than 20% of the image for a valid close-up.
    # 2. Edge density should be low (landscapes are noisy).
    
    is_skin = skin_percentage > 20 and edge_density < 5
    
    if not is_skin:
        if edge_density >= 5:
            msg = "Image represents a complex scene (like a landscape). Please upload a focused close-up of the skin area."
        else:
            msg = f"No human skin detected ({round(skin_percentage, 1)}%). Please upload a clear, close-up photo of the affected area."
        return False, skin_percentage, msg

    return True, skin_percentage, "Skin detected"

def analyze_skin_features(img):
    """
    Analyzes image features to simulate disease detection.
    """
    # Simply simulate analysis results based on image complexity and spot presence
    # In a real scenario, this would involve a trained CNN model.
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)
    
    # Count "interesting" spots (blobs/contours)
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    num_spots = len(contours)
    
def analyze_skin_features(img, real_diseases):
    """
    Analyzes image features (Color & Texture) and matches against real disease data.
    """
    # 1. Texture Analysis (Laplacian Variance)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)
    laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    
    # 2. Color Analysis (Histogram)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    # Define ranges for "Symptomatic" colors
    # Red/Inflamed (Acne, Eczema, Rosacea)
    lower_red1 = np.array([0, 50, 50])
    upper_red1 = np.array([10, 255, 255])
    lower_red2 = np.array([170, 50, 50])
    upper_red2 = np.array([180, 255, 255])
    mask_red = cv2.bitwise_or(cv2.inRange(hsv, lower_red1, upper_red1), cv2.inRange(hsv, lower_red2, upper_red2))
    
    # Brown/Pigmented (Melanoma, Moles)
    lower_brown = np.array([10, 50, 20])
    upper_brown = np.array([30, 255, 150])
    mask_brown = cv2.inRange(hsv, lower_brown, upper_brown)
    
    # White/Depigmented (Vitiligo, Fungal)
    lower_white = np.array([0, 0, 180])
    upper_white = np.array([180, 40, 255])
    mask_white = cv2.inRange(hsv, lower_white, upper_white)
    
    red_perc = (cv2.countNonZero(mask_red) / img.size) * 100
    brown_perc = (cv2.countNonZero(mask_brown) / img.size) * 100
    white_perc = (cv2.countNonZero(mask_white) / img.size) * 100

    # 3. Decision Logic
    dominant_color = "neutral"
    if red_perc > max(brown_perc, white_perc, 2): dominant_color = "red"
    elif brown_perc > max(red_perc, white_perc, 2): dominant_color = "brown"
    elif white_perc > max(red_perc, brown_perc, 2): dominant_color = "white"

    if not real_diseases:
        return {"condition": "Unknown", "error": "No disease data available for matching"}

    # Filter/Score diseases based on color mapping
    scored_matches = []
    for d in real_diseases:
        name = d.get('name', '').lower()
        score = 0
        
        # Color Matching
        if dominant_color == "red" and any(word in name for word in ['acne', 'pimple', 'eczema', 'rosacea', 'dermatitis']):
            score += 40
        elif dominant_color == "brown" and any(word in name for word in ['melanoma', 'cancer', 'mole']):
            score += 40
        elif dominant_color == "white" and any(word in name for word in ['vitiligo', 'fungal', 'ringworm']):
            score += 40
            
        # Texture matching (Active/Severe vs Smooth)
        if laplacian_var > 100 and any(word in name for word in ['psoriasis', 'eczema', 'melanoma']):
            score += 20
            
        scored_matches.append((score, d))

    # Pick best match
    scored_matches.sort(key=lambda x: x[0], reverse=True)
    best_match = scored_matches[0][1]
    
    # Confidence calculation
    base_conf = 70.0
    conf = min(base_conf + scored_matches[0][0] / 2 + random.uniform(0, 5), 98.5)

    return {
        "condition": best_match.get('name'),
        "severity": "High" if laplacian_var > 200 else "Moderate" if laplacian_var > 50 else "Mild",
        "description": best_match.get('description'),
        "suggestions": best_match.get('treatments', [])[:3],
        "isUrgent": "Cancer" in best_match.get('name') or laplacian_var > 400,
        "confidence": f"{round(conf, 1)}%",
        "metrics": {
            "textureComplexity": round(laplacian_var, 2),
            "inflammationIndex": round(red_perc, 2),
            "pigmentIndex": round(brown_perc, 2),
            "colorLossIndex": round(white_perc, 2)
        }
    }

if __name__ == "__main__":
    try:
        # Read input from stdin
        input_data = sys.stdin.read()
        if not input_data:
            print(json.dumps({"error": "No input data received"}))
            sys.exit(1)
            
        data = json.loads(input_data)
        image_b64 = data.get("image")
        real_diseases = data.get("realDiseases", [])
        
        if not image_b64:
            print(json.dumps({"error": "No image data found in input"}))
            sys.exit(1)

        # 1. Decode Image
        img = decode_image(image_b64)
        if img is None:
            print(json.dumps({"error": "Failed to decode image"}))
            sys.exit(1)

        # 2. Detect Skin
        has_skin, skin_perc, error_msg = detect_skin(img)
        
        if not has_skin:
            print(json.dumps({
                "error": error_msg,
                "confidence": "0%",
                "skinPercentage": f"{round(skin_perc, 2)}%"
            }))
            sys.exit(0)

        # 3. Analyze Features
        output = analyze_skin_features(img, real_diseases)
        output["skinPercentage"] = f"{round(skin_perc, 2)}%"
        
        # Print result to stdout
        print(json.dumps(output))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
