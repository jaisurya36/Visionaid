import requests

API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"

headers = {
    "User-Agent": "Mozilla/5.0"
}

def generate_caption(image_path):

    with open(image_path, "rb") as image_file:
        image_bytes = image_file.read()

    response = requests.post(
        API_URL,
        headers=headers,
        data=image_bytes
    )

    result = response.json()

    print(result)

    try:
        caption = result[0]["generated_text"]
    except:
        caption = "Could not generate caption"

    return caption