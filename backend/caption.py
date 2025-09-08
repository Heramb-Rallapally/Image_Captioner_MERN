import sys
import json
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
import torch

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)

    image_path = sys.argv[1]

    try:
        image = Image.open(image_path).convert("RGB")
    except Exception as e:
        print(json.dumps({"error": f"Failed to open image: {str(e)}"}))
        sys.exit(1)

    try:
        processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
        model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

        # Always use CPU
        device = "cpu"
        model.to(device)

        inputs = processor(images=image, return_tensors="pt").to(device)

        out = model.generate(**inputs)
        caption = processor.decode(out[0], skip_special_tokens=True)

        print(json.dumps({"caption": caption}))
    except Exception as e:
        print(json.dumps({"error": f"Captioning failed: {str(e)}"}))
        sys.exit(1)

if __name__ == "__main__":
    main()
