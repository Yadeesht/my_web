from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from bot import query_rag_engine

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount current directory as static
app.mount("/", StaticFiles(directory=".", html=True), name="static")

# Serve index.html at root
@app.get("/")
async def serve_index():
    return FileResponse(os.path.join(".", "index.html"))

@app.post("/chat")
async def handle_chat(request: Request):
    try:
        payload = await request.json()
        user_message = payload.get("message", "")

        if not user_message:
            return JSONResponse(
                status_code=400,
                content={"error": "Message is required"}
            )

        response = query_rag_engine(user_message)
        return JSONResponse(content={"response": response})
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )
