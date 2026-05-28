from dotenv import load_dotenv

load_dotenv()
from fastapi.middleware.cors import CORSMiddleware
from app.database import analysis_collection
from fastapi.staticfiles import StaticFiles
import uuid
from app.services.voice_service import generate_voice
from fastapi.staticfiles import StaticFiles
from app.services.detection_service import detect_objects
from fastapi import FastAPI, UploadFile, File
#from app.services.caption_service import generate_caption
from fastapi.middleware.cors import CORSMiddleware
import shutil

from app.services.ocr_service import extract_text

app = FastAPI()
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)
app.mount("/audio", StaticFiles(directory="audio"), name="audio")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "VisionAid Backend Running"}

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = f"uploads/{unique_filename}"

   

    # Save Image
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # OCR Extraction
    extracted_text = extract_text(file_path)
    # Object Detection
    objects, detected_image = detect_objects(file_path)
    voice_text = f"Detected objects are {', '.join(objects)}"

   
   
    # AI Caption
    caption = "AI caption temporarily unavailable"
    # try:

#     analysis_data = {

#         "filename": unique_filename,

#         "ocr_text": extracted_text,

#         "objects": objects,

#         "caption": caption,
#     }

#     analysis_collection.insert_one(
#         analysis_data
#     )

# except Exception as e:

#     print("MongoDB Error:", e)

    return{
    "message": "Image uploaded successfully",
    "filename": unique_filename,
    "ocr_text": extracted_text,
    "caption": caption,
    "objects": objects,
    "detected_image":f"http://127.0.0.1:8000/{detected_image}",
}