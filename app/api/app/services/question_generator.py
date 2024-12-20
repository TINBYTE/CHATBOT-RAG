from concurrent.futures import ThreadPoolExecutor
import tqdm

# Generate questions in parallel to speed up the process
def generate_questions_parallel(base, query, question_type, question_nbr, ollama_model, difficulty):
    def generate_question(content):
        if question_type.lower() == "mcq":
            return {
                "type": "mcq",
                "source_content": content,
                "question_data": generate_mcq(content, query, ollama_model, difficulty)
            }
        elif question_type.lower() == "open-ended":
            return {
                "type": "open-ended",
                "source_content": content,
                "question_data": generate_open_ended(content, query, ollama_model, difficulty)
            }
        else:
            raise ValueError("Invalid question type. Use 'mcq' or 'open-ended'.")

    with ThreadPoolExecutor() as executor:
        questions = list(
            tqdm.tqdm(
                executor.map(generate_question, base[:question_nbr]),
                total=question_nbr,
                desc="Generating Questions"
            )
        )
    return questions


# Generate QCM questions
def generate_mcq(content, query, ollama_model, difficulty="intermédiaire"):
    prompt = f"""
    Agis comme un système français spécialisé dans la génération de questions à choix multiples (QCM). 
    Génère une question de niveau {difficulty} en français basée sur le contenu suivant. 
    
    La question doit :
    1. Tester la compréhension d’un concept clé lié à la requête suivante : '{query}'.
    2. Si la question nécessite un contexte ou du code, inclure ces informations dans la question.
    3. Être claire et bien structurée, sans références inutiles au contenu source.
    4. Contenir uniquement :
        - Une question pertinente
        - Quatre options de réponse (A, B, C, D), avec une seule réponse correcte
        - La réponse correcte clairement identifiée
        - Une explication concise en français, expliquant pourquoi la réponse est correcte.

    Formate la réponse dans un format JSON comme suit :

    {{
        "question": "<la question>",
        "options": {{
            "A": "<option A>",
            "B": "<option B>",
            "C": "<option C>",
            "D": "<option D>"
        }},
        "correct_answer": "<la réponse correcte>",
        "explanation": "<explication concise>"
    }}

    Contenu pour générer la question :
{content}
    """
    response = ollama_model.invoke(prompt)
    return response


# Generate open-ended questions
def generate_open_ended(content, query, ollama_model, difficulty="intermédiaire"):

    prompt = f"""
    Agis comme un système français spécialisé dans la génération de questions ouvertes. 
    Génère une question ouverte de niveau {difficulty} en français basée sur le contenu suivant.
    La question doit se concentrer sur le concept de '{query}' et tester la compréhension de ce concept dans le contexte du contenu.

    La sortie doit inclure uniquement :
    1. Une question claire et bien structurée
    2. Une réponse exemple concise
    3. Une explication en français de la réponse, sans faire référence au contenu source.

    Contenu :
    {content}
    """
    response = ollama_model.invoke(prompt)
    return response
