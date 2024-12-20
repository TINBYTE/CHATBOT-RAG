from transformers import pipeline
import torch
from app.services.cleaning import filter_irrelevant_chunks


# Retrieve top-k relevant documents from FAISS index
def retrieve_documents_from_faiss(query, faiss_index, k=5):
    if not faiss_index:
        raise ValueError("FAISS index is not initialized.")
    else:
        retriever = faiss_index.as_retriever(search_type="similarity", search_kwargs={"k": k})
        retrieved_docs = retriever.get_relevant_documents(query)
        return retrieved_docs


# Load a re-ranker (for simplicity, we use a transformer model for re-ranking)
re_ranker = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Re-rank retrieved documents using a transformer model 
def rerank_documents(query, documents):

    re_ranked = []

    for doc in documents:
        # Use a zero-shot classifier to rank documents based on relevance to the query
        result = re_ranker(query, candidate_labels=[doc.page_content])
        score = result['scores'][0]  # Take the relevance score

        # Store document along with its score
        re_ranked.append({"document": doc, "score": score})

    # Sort documents based on score (higher score is more relevant)
    re_ranked.sort(key=lambda x: x['score'], reverse=True)

    # Return the top re-ranked documents
    return [doc["document"] for doc in re_ranked]

# Main retrieval and re-ranking pipeline
def retrieve_and_rerank(query, faiss_index, k=25, top_n=5):

    # Step 1: Retrieve top-k relevant documents from FAISS index
    retrieved_docs = retrieve_documents_from_faiss(query, faiss_index, k)

    # Step 2: Filter out irrelevant documents (e.g., TOC, excessive dots)
    filtered_docs = filter_irrelevant_chunks(retrieved_docs)

    # Step 3: Re-rank the filtered documents
    re_ranked_docs = rerank_documents(query, filtered_docs)

    # Return the top 'top_n' re-ranked documents
    return re_ranked_docs[:top_n]