# RAG Architecture

A simple RAG architecture contains four important parts: documents, retrieval, context construction, and generation.

Documents are first prepared for retrieval. Long documents are normally divided into smaller chunks so that relevant information can be found more easily.

During retrieval, the user's question is compared with document chunks. The system selects the chunks that are most relevant to the question.

The selected chunks become context for the language model. The model uses the question and retrieved context to generate the final response.

A simple RAG pipeline can therefore be represented as:

Question -> Retrieval -> Relevant Context -> Language Model -> Answer