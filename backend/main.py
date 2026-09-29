from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.retrieval import retrieve_documents
from backend.llm import generate_answer


app = FastAPI()


# Allow the frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ResearchRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "ResearchPilot is running!"
    }


@app.post("/research")
def research(request: ResearchRequest):

    retrieved_documents = retrieve_documents(
        request.question
    )

    answer = generate_answer(
        request.question,
        retrieved_documents
    )

    return {
        "answer": answer,
        "sources": retrieved_documents
    }