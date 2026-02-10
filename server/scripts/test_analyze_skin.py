import json
import subprocess
import base64
import numpy as np
import cv2
import os
import time

# Mock Disease Dataset (Layer 4)
MOCK_DISEASES = [
    {
        "name": "Acne Vulgaris",
        "description": "Inflammatory skin condition",
        "treatments": ["Topical retinoids", "Benzoyl peroxide"]
    },
    {
        "name": "Malignant Melanoma",
        "description": "High-risk pigmented lesion",
        "treatments": ["Surgical excision", "Biopsy", "Oncology consult"]
    }
]

def create_mock_image(type='skin'):
    """
    Creates various test images including real-world failure cases (Layer 1).
    """
    img = np.zeros((400, 400, 3), np.uint8) # Increased size for better face mesh detection
    
    if type == 'skin':
        img[:] = (150, 170, 230) # Healthy skin tone
    elif type == 'dark_skin':
        img[:] = (60, 80, 120)   # Under-exposed/Darker skin tone
    elif type == 'overexposed':
        img[:] = (230, 230, 230) # Blown out lighting
    elif type == 'partial_skin':
        img[:] = (150, 170, 230)
        cv2.rectangle(img, (0, 0), (200, 400), (0, 0, 0), -1) # Half blacked out
    elif type == 'landscape':
        img[:] = (100, 150, 200)
        for _ in range(120): # Noisy landscape
            pt1 = (np.random.randint(0, 400), np.random.randint(0, 400))
            pt2 = (np.random.randint(0, 400), np.random.randint(0, 400))
            cv2.line(img, pt1, pt2, (np.random.randint(0, 255), 0, np.random.randint(0, 255)), 1)
    else:
        img[:] = (0, 255, 0) # Non-skin (Green)
    
    _, buffer = cv2.imencode('.jpg', img)
    return base64.b64encode(buffer).decode('utf-8'), img

def test_script(image_b64):
    """
    Executes the analysis script and handles JSON decoding safely (Layer 5).
    """
    script_path = os.path.join(os.path.dirname(__file__), 'analyze_skin.py')
    process = subprocess.Popen(
        ['python', script_path],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    # Inject Mock Data (Layer 4)
    input_data = {
        "image": f"data:image/jpeg;base64,{image_b64}",
        "realDiseases": MOCK_DISEASES
    }
    
    stdout, stderr = process.communicate(input=json.dumps(input_data))
    
    try:
        return json.loads(stdout)
    except json.JSONDecodeError:
        return {"error": "Invalid JSON output", "raw": stdout, "stderr": stderr}

def run_test_case(name, should_pass=True):
    """
    Parameterized Test Runner with Benchmarking and Assertions (Layer 2, 3, 6).
    """
    print(f"--- Running Test: {name.upper()} ---")
    b64, raw_img = create_mock_image(name)
    
    start_time = time.time()
    result = test_script(b64)
    duration = time.time() - start_time
    
    # Assertions (Layer 2)
    success = result.get("success", False)
    
    # Performance Monitoring (Layer 3)
    print(f"Latency: {round(duration, 2)}s | Status: {'PASS' if success == should_pass else 'FAIL'}")
    assert duration < 3.0, f"Performance Failure: {duration}s exceeds threshold"
    
    if success:
        print(f"Analysis: {result.get('analysis')} (Confidence: {result.get('confidence')})")
        # Safety & UX Validation (Layer 8)
        assert "disclaimer" in result, "Medical Safety Failure: No disclaimer found"
        assert "hotspots" in result, "UX Failure: No hotspots generated"
        assert isinstance(result.get("isUrgent"), bool), "Type Failure: isUrgent must be boolean"
    else:
        print(f"Expected Rejection: {result.get('error')}")
        # Save Debug Image on unexpected failure (Layer 7)
        if should_pass:
            cv2.imwrite(f"debug_fail_{name}.jpg", raw_img)
            print(f"Saved debug image: debug_fail_{name}.jpg")

    assert success == should_pass, f"Outcome Mismatch: Got {success}, expected {should_pass}"
    print("Test Validation: SUCCESSFUL\n")

if __name__ == "__main__":
    TEST_CASES = [
        ("skin", True),
        ("dark_skin", True),
        ("overexposed", True),
        ("landscape", False),
        ("green", False)
    ]
    
    total_start = time.time()
    for name, expected in TEST_CASES:
        try:
            run_test_case(name, expected)
        except AssertionError as e:
            print(f"❌ TEST FAILED: {str(e)}\n")
            
    print(f"Total Test Suite Duration: {round(time.time() - total_start, 2)}s")
