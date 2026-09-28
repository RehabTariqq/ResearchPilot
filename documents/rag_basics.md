# Retrieval Augmented Generation

Retrieval Augmented Generation, commonly called RAG, is a technique that allows a language model to use information retrieved from external documents when generating an answer.

A basic RAG system has several stages. First, documents are collected and divided into smaller pieces called chunks. The chunks can then be converted into numerical representations called embeddings.

When a user asks a question, the system searches for chunks that are semantically related to the question. The retrieved information is then provided to a language model as context.

RAG can make answers more traceable because the system can keep track of which documents were retrieved. It can also allow an application to use information that was not part of the original language model training data.