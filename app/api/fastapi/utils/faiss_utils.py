from langchain_huggingface import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS

# Load the FAISS vector database
embedding_model_name = "all-MPNet-base-v2"

# Load FAISS index
def load_faiss_index(save_path):
    print("Loading FAISS vector database...")
    embedding_model = HuggingFaceEmbeddings(model_name=embedding_model_name)
    try:
        faiss_index = FAISS.load_local(save_path, embeddings=embedding_model, allow_dangerous_deserialization=True)
        print("FAISS index loaded successfully.")
    except Exception as e:
        print(f"Error loading FAISS index: {e}")
        faiss_index = None

    return faiss_index