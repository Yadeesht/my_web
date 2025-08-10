from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from bot import query_rag_engine
import os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chat API (define BEFORE mounting static)
@app.post("/chat")
async def handle_chat(request: Request):
    try:
        payload = await request.json()
        user_message = payload.get("message", "")
        if not user_message:
            return JSONResponse(status_code=400, content={"error": "Message is required"})
        response = query_rag_engine(user_message)
        return JSONResponse(content={"response": response})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

# Mount static LAST (serve index.html and assets)
frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "frontend"))
static_dir = frontend_path if os.path.isdir(frontend_path) else os.path.dirname(__file__)
app.mount("/", StaticFiles(directory=static_dir, html=True), name="frontend")