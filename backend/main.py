from fastapi import FastAPI
from pydantic import BaseModel

from backend.retrieval import search_documents
from backend.llm import generate_answer


app = FastAPI(title="ResearchPilot")


class ResearchRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "ResearchPilot is running!"
    }


@app.post("/research")
def research(request: ResearchRequest):
    results = search_documents(request.question)

    if not results:
        return {
            "answer": "I could not find any relevant documents.",
            "sources": [],
        }

    context_parts = []

    for result in results:
        context_parts.append(
            f"Source: {result['filename']}\n"
            f"{result['text']}"
        )

    context = "\n\n".join(context_parts)

    answer = generate_answer(
        request.question,
        context,
    )

    sources = [
        {
            "filename": result["filename"],
            "score": result["score"],
        }
        for result in results
    ]

    return {
        "answer": answer,
        "sources": sources,
    }