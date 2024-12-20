import re


# Function to filter irrelevant chunks from a list of retrieved documents
# Filter out irrelevant chunks that contain table of contents, irrelevant sections, and excessive dots
def filter_irrelevant_chunks(documents, max_dot_ratio=0.5, min_length=30):
    relevant_chunks = []

    # Define patterns for identifying table of contents, irrelevant sections, and excessive dots
    irrelevant_patterns = [
        r"table\s*des\s*matières",  # table of contents
        r"liste\s*des\s*(figures|tables)",  # list of figures or tables
        r"\.{3,}",  # More than 3 consecutive dots (likely a table of contents)
        r"\b(guide|résumé|abstract|remerciement|introduction|conclusion|références|bibliographie|webographie)\b",  # Common non-SQL sections
    ]

    for doc in documents:
        # Step 1: Check if the chunk contains any irrelevant pattern
        text = doc.page_content.strip().lower()

        # If any irrelevant pattern is matched, skip this chunk
        if any(re.search(pattern, text) for pattern in irrelevant_patterns):
            continue

        # Step 2: Check if the chunk has too many dots (likely a table of contents)
        dot_ratio = text.count('.') / len(text.split())  # Calculate dot ratio
        if dot_ratio > max_dot_ratio:
            continue

        # Step 3: Check if the chunk is short
        # Split the text into words and check length
        words = doc.page_content.split()
        if len(words) < min_length:
            continue

        # If the chunk passes all checks, keep it
        relevant_chunks.append(doc)

    return relevant_chunks


import re

def clean_chunk_for_question_generation(chunk, min_length):
    """
    Clean the chunk for question generation by removing unnecessary text and ensuring meaningful content.

    Args:
        chunk (str): The chunk of text to be cleaned.
        min_length (int): Minimum length of the chunk to ensure it's meaningful.

    Returns:
        str: Cleaned chunk ready for question generation.
    """
    # Step 1: Normalize whitespace (remove extra spaces, newlines)
    cleaned_text = re.sub(r'[ \t]+', ' ', chunk).strip()

    # Step 2: Remove non-informative filler phrases like "introduction", "summary"
    cleaned_text = re.sub(r'\b(introduction|résumé|summary|conclusion)\b', '', cleaned_text, flags=re.IGNORECASE)

    # Step 3: Ensure minimum content length for meaningful chunk
    if len(cleaned_text.split()) < min_length:
        return None  # Chunk is too short to be meaningful for question generation

    return cleaned_text

def clean_relevant_chunks_for_question_generation(re_ranked_docs, min_chunk_length):
    cleaned_chunks = []

    for doc in re_ranked_docs:
        cleaned_chunk = clean_chunk_for_question_generation(doc.page_content, min_chunk_length)
        if cleaned_chunk:  # Only add the chunk if it's not None (meaningful)
            cleaned_chunks.append(cleaned_chunk)

    return cleaned_chunks