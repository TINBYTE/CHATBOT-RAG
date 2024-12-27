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


def generate_mcq(content, query, ollama_model, difficulty="intermédiaire"):    
    # Guide for difficulty levels as a dictionary
    difficulty_guide = {
        "débutant": "Questions simples qui testent des connaissances de base. Exemples : définitions, faits élémentaires.",
        "intermédiaire": "Questions qui nécessitent une compréhension plus approfondie et l'application de concepts. Exemples : analyse de cas, choix entre plusieurs options.",
        "avancé": "Questions complexes qui demandent une réflexion critique et une synthèse des informations. Exemples : résolution de problèmes, interprétation de données."
    }

    # Accessing the appropriate guide based on the specified difficulty
    guide_description = difficulty_guide.get(difficulty, "Niveau de difficulté non reconnu. Veuillez choisir entre 'débutant', 'intermédiaire' ou 'avancé'.")

    prompt = f"""
    Vous êtes un assistant spécialisé dans la génération de questions à choix multiples (QCM) en français.
    Utilisez le contenu suivant pour créer une question conforme aux consignes ci-dessous.

    ### Guide des niveaux de difficulté :
    {guide_description}

    ### Consignes :
    1. *Lien avec la requête* :
       La question doit être directement liée au concept suivant : '{query}' et évaluer la compréhension de ce concept.

    2. *Niveau de difficulté* :
       Adaptez la complexité de la question au niveau spécifié : '{difficulty}'. Assurez-vous que la question soit appropriée pour ce niveau.

    3. *Structure des options* :
       - Créez une question avec quatre options de réponse (A, B, C, D), dont une seule est correcte.
       - Les options doivent être distinctes, pertinentes et logiquement plausibles.

    4. *Format de sortie* :
       Retournez la question sous le format JSON suivant :
       json
       {{
           "question": "",
           "options": {{
               "A": "",
               "B": "",
               "C": "",
               "D": ""
           }},
           "correct_answer": "",
           "explanation": ""
       }}
       

    5. *Précision et clarté* :
       Toutes les informations doivent être extraites uniquement du contenu fourni. Évitez toute ambiguïté et assurez-vous que la question soit claire et compréhensible.

    ### Contenu à utiliser :
    {content}
    """
    response = ollama_model.invoke(prompt)
    return response


def generate_open_ended(content, query, ollama_model, difficulty="intermédiaire"):
    # Guide for difficulty levels as a dictionary
    difficulty_guide = {
        "débutant": "Questions simples qui invitent à une réflexion de base. Réponses courtes et directes. Accent sur la compréhension élémentaire.",
        "intermédiaire": "Questions qui encouragent une analyse plus approfondie. Réponses nécessitant une explication structurée et des exemples.",
        "avancé": "Questions complexes qui stimulent une pensée critique et une analyse approfondie. Réponses détaillées, argumentées et nuancées."
    }

    # Accessing the appropriate guide based on the specified difficulty
    guide_description = difficulty_guide.get(difficulty, "Niveau de difficulté non reconnu. Veuillez choisir entre 'débutant', 'intermédiaire' ou 'avancé'.")

    prompt = f"""
    Vous êtes un assistant spécialisé dans la génération de questions ouvertes en français.
    Utilisez le contenu suivant pour créer une question conforme aux consignes ci-dessous.

    ### Guide des niveaux de difficulté :
    {guide_description}

    ### Consignes :
    1. *Lien avec la requête* :
       La question doit être directement liée au concept suivant : '{query}' et stimuler une réflexion approfondie.

    2. *Niveau de difficulté* :
       Adaptez la complexité de la question au niveau spécifié : '{difficulty}'. Assurez-vous que la question soit appropriée pour ce niveau.

    3. *Structure de la question ouverte* :
       - Formulez une question qui invite à une réponse développée et réfléchie.
       - La question doit permettre une exploration nuancée du sujet.

    4. *Format de sortie* :
       Retournez la question sous le format JSON suivant :
       json
       {{
           "question": "",
           "correct_answer": "",
           "explanation": ""
       }}
       

    5. *Précision et clarté* :
       Toutes les informations doivent être extraites uniquement du contenu fourni. 
       Assurez-vous que la question soit claire, stimulante et en adéquation avec le niveau de difficulté.

    ### Contenu à utiliser :
    {content}
    """
    response = ollama_model.invoke(prompt)
    return response