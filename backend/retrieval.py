import os
from pathlib import Path

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


DOCUMENTS_FOLDER = Path(__file__).resolve().parent.parent / "documents"


def load_documents():
    documents = []

    for file_path in DOCUMENTS_FOLDER.glob("*.md"):
        content = file_path.read_text(encoding="utf-8")

        documents.append({
            "filename": file_path.name,
            "content": content
        })

    return documents


def retrieve_documents(question, top_k=3):
    documents = load_documents()

    if not documents:
        return []

    texts = [doc["content"] for doc in documents]

    vectorizer = TfidfVectorizer()

    document_vectors = vectorizer.fit_transform(texts)
    question_vector = vectorizer.transform([question])

    similarities = cosine_similarity(
        question_vector,
        document_vectors
    )[0]

    ranked_documents = sorted(
        zip(documents, similarities),
        key=lambda x: x[1],
        reverse=True
    )

    results = []

    for document, score in ranked_documents[:top_k]:
        results.append({
            "filename": document["filename"],
            "content": document["content"],
            "score": float(score)
        })

    return results