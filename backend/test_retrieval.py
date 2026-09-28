from retrieval import search_documents


question = "What is RAG and how does retrieval work?"

results = search_documents(question)

for result in results:
    print("\n-----------------------------")
    print("SOURCE:", result["filename"])
    print("SCORE:", result["score"])
    print("-----------------------------")
    print(result["text"][:500])