from pathlib import Path

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


DOCUMENTS_FOLDER = Path(__file__).parent.parent / "documents"


def load_documents():
    documents = []

    for file_path in DOCUMENTS_FOLDER.glob("*.md"):
        text = file_path.read_text(encoding="utf-8")

        documents.append(
            {
                "filename": file_path.name,
                "text": text,
            }
        )

    return documents


def search_documents(question, top_k=3):
    documents = load_documents()

    if not documents:
        return []

    texts = [document["text"] for document in documents]

    vectorizer = TfidfVectorizer(stop_words="english")

    vectors = vectorizer.fit_transform(texts + [question])

    document_vectors = vectors[:-1]
    question_vector = vectors[-1]

    scores = cosine_similarity(
        question_vector,
        document_vectors,
    )[0]

    ranked_indexes = scores.argsort()[::-1]

    results = []

    for index in ranked_indexes[:top_k]:
        results.append(
            {
                "filename": documents[index]["filename"],
                "text": documents[index]["text"],
                "score": float(scores[index]),
            }
        )

    return results