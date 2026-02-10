import json
import subprocess
import base64
import numpy as np
import cv2
import os

def create_mock_image(type='skin'):
    # Create a 300x300 image (larger for better edge detection testing)
    img = np.zeros((300, 300, 3), np.uint8)
    
    if type == 'skin':
        # Realistic Human Skin Tone (Warm Peach)
        img[:] = (150, 170, 230)
    elif type == 'landscape':
        # Warm sunset landscape with lots of "noisy" edges (kites/trees simulation)
        img[:] = (100, 150, 200) # Sunset-like base color
        # Add random noise/lines to simulate kites/edges
        for _ in range(100):
            pt1 = (np.random.randint(0, 300), np.random.randint(0, 300))
            pt2 = (np.random.randint(0, 300), np.random.randint(0, 300))
            color = (np.random.randint(0, 255), np.random.randint(0, 255), np.random.randint(0, 255))
            cv2.line(img, pt1, pt2, color, 1)
    else:
        # Pure non-skin (Green)
        img[:] = (0, 255, 0)
    
    _, buffer = cv2.imencode('.jpg', img)
    return base64.b64encode(buffer).decode('utf-8')

def test_script(image_b64):
    process = subprocess.Popen(
        ['python', 'c:/Desktop/mahan/Hospital/server/scripts/analyze_skin.py'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    input_json = json.dumps({"image": f"data:image/jpeg;base64,{image_b64}"})
    stdout, stderr = process.communicate(input=input_json)
    
    return json.loads(stdout)

if __name__ == "__main__":
    print("Testing with close-up skin photo...")
    result_skin = test_script(create_mock_image('skin'))
    print(f"Result: {result_skin.get('condition') or result_skin.get('error')} (Skin: {result_skin.get('skinPercentage')})")
    
    print("\nTesting with complex landscape (warm colors)...")
    result_landscape = test_script(create_mock_image('landscape'))
    print(f"Result: {result_landscape.get('error')} (Skin: {result_landscape.get('skinPercentage')})")
