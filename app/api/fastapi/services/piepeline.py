from app.services.retrieval import retrieve_and_rerank
from app.services.cleaning import clean_relevant_chunks_for_question_generation
from app.services.question_generator import generate_questions_parallel

# Optimized exam generation pipeline
def exam_pipeline(query, question_type, question_nbr, faiss_index, ollama_model, difficulty="intermediate", k=25, top_n=5):
    print("Retrieving relevant documents...")
    re_ranked_docs = retrieve_and_rerank(query, faiss_index, k, top_n)

    if not re_ranked_docs:
        print("No documents found for the given query.")
        return {}

    print(f"Retrieved {len(re_ranked_docs)} documents.")

    print("Cleaning retrieved content...")
    cleaned_chunks = clean_relevant_chunks_for_question_generation(re_ranked_docs, min_chunk_length=30)
    print(f"Normalized to {len(cleaned_chunks)} valid chunks.")

    print("Generating questions...")
    exam = {"questions": generate_questions_parallel(cleaned_chunks, query, question_type, question_nbr, ollama_model, difficulty)}

    print(f"Generated {len(exam['questions'])} questions.")
    return exam
