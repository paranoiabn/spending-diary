from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    content = await file.read() 
    text_content = content.decode("utf-8")
    return {
        "filename": file.filename,
        "preview": text_content[:100],
        "size": len(content)
    }