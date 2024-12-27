from fastapi import APIRouter, HTTPException
from app.schemas.request import QuestionRequest
from app.schemas.response import QuestionResponse

router = APIRouter()

@router.post("/newexam", response_model=QuestionResponse)
async def generate_exam(request: QuestionRequest):
    try:
        return {
  "questions": [
    {
      "type": "mcq",
      "source_content": "# Jointure Naturelle\n\nLa jointure naturelle est une équijointure dont la condition porte sur l'égalité de valeurs entre tous les attributs de même nom, des relations concernées. Le schéma de la relation résultante correspond à une concaténation de l'ensemble des attributs des deux relations dont elle est issue, autour du ou des attributs communs.\n\n129",
      "question_data": {
        "question": "Qu'est-ce que la jointure naturelle entre deux tables avec des attributs de même nom?",
        "options": {
          "A": "Une équijointure où la condition est l'inégalité des valeurs entre tous les attributs de même nom",
          "B": "Une équijointure où la condition porte sur l'égalité de toutes les valeurs des attributs",
          "C": "Une jointure naturelle où la condition porte sur l'égalité de valeurs entre tous les attributs de même nom, des relations concernées",
          "D": "Une jointure interne qui renvoie uniquement les enregistrements avec une valeur commune dans toutes les colonnes"
        },
        "correct_answer": "C",
        "explanation": "La jointure naturelle est utilisée lorsque les deux tables ont des attributs de même nom, et que vous voulez lier ces enregistrements sur la base de ces attributs. La condition pour cette jointure porte sur l'égalité des valeurs entre tous les attributs de même nom des deux tables."
      }
    },
    {
      "type": "mcq",
      "source_content": "# Vertigo/CNAM, Paris\n\nPour des grandes relations et en l’absence d’index, la jointure par tri-fusion présente les avantages suivants :\n\n1. Efﬁcacité : bien meilleure que les boucles imbriquées.\n2. Manipulation de données triées : facilite l’élimination de dupliqués ou l’afﬁchage ordonné.\n3. Très général : permet de traiter tous les types de jointure.\n\n# Jointure par hachage\n\nComme le tri-fusion, la jointure par hachage permet de limiter le nombre de comparaisons entre n-uplets.\n\n1. Une des relations,\n2. La deuxième relation est parcourue séquentiellement. Pour chaque n-uplet, on est hachée sur l’attribut de jointure avec une fonction.\n\nconsulte la page indiquée par application de la fonction contient des n-uplets de. Si oui on fait la jointure limitée à ces n-uplets et on regarde si elle.",
      "question_data": {
        "question": "Quelle est la principale différence entre la jointure par tri-fusion et la jointure par hachage ?",
        "options": {
          "A": "La jointure par hachage est plus rapide que la jointure par tri-fusion.",
          "B": "La jointure par hachage nécessite une fonction de hachage pour traiter les n-uplets.",
          "C": "La jointure par tri-fusion est plus générale et permettrait de traiter tous les types de jointure.",
          "D": "La jointure par hachage est plus efficace que la jointure par tri-fusion en termes de manipulation de données triées."
        },
        "correct_answer": "B",
        "explanation": "La jointure par hachage nécessite une fonction de hachage pour traiter les n-uplets, ce qui permet de limiter le nombre de comparaisons entre n-uplets. C'est la principale différence avec la jointure par tri-fusion."
      }
    }
  ]

        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
