import cv2

import pytesseract

from PIL import Image

# IMPORTANT WINDOWS PATH
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

def extract_text(image_path):

    # READ IMAGE
    image = cv2.imread(image_path)

    # GRAYSCALE
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    # REMOVE NOISE
    gray = cv2.GaussianBlur(
        gray,
        (5, 5),
        0
    )

    # THRESHOLD
    thresh = cv2.threshold(
        gray,
        0,
        255,
        cv2.THRESH_BINARY +
        cv2.THRESH_OTSU
    )[1]

    # SAVE TEMP IMAGE
    temp_path = "temp_ocr.png"

    cv2.imwrite(
        temp_path,
        thresh
    )

    # OCR EXTRACT
    text = pytesseract.image_to_string(
        Image.open(temp_path)
    )

    return text.strip()