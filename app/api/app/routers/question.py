from fastapi import APIRouter, HTTPException
from app.schemas.request import QuestionRequest
from app.schemas.response import QuestionResponse

router = APIRouter()

@router.post("/newexam", response_model=QuestionResponse)
async def generate_exam(request: QuestionRequest):
    try:
        return {"questions": [
            {
                "type": "mcq",
                "source_content": "SQL JOIN operations combine rows from two or more tables based on a related column between them. There are several types of joins such as INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.",
                "question_data": {
                    "question": "Which type of JOIN returns only the rows where there is a match in both tables?",
                    "options": {
                        "A": "LEFT JOIN",
                        "B": "RIGHT JOIN",
                        "C": "INNER JOIN",
                        "D": "FULL OUTER JOIN"
                    },
                    "correct_answer": "C",
                    "explanation": "An INNER JOIN returns only the rows where there is a match in both the left and the right tables, based on the specified join condition."
                }
            },
            {
                "type": "mcq",
                "source_content": "A LEFT JOIN returns all the rows from the left table, and the matching rows from the right table. If there is no match in the right table, NULL values are returned for the right table's columns.",
                "question_data": {
                    "question": "In a LEFT JOIN, what happens when there is no match for a row in the left table in the right table?",
                     "options": {
                        "A": "The row from the left table is skipped.",
                        "B": "The row from the left table is combined with a random row from the right table.",
                         "C":"The row from the left table is included with NULL values for columns from the right table.",
                        "D": "The join operation throws an error."
                    },
                    "correct_answer": "C",
                    "explanation": "In a LEFT JOIN, if no matching rows are found in the right table, the columns from the right table will be filled with NULL values for the corresponding row from the left table."
                }
             },
            {
                "type": "mcq",
                "source_content": "A RIGHT JOIN is the opposite of a LEFT JOIN. It returns all rows from the right table and matching rows from the left table. If no match is found in the left table, NULL values are used for columns from the left table.",
                "question_data": {
                    "question": "What is the primary difference between a LEFT JOIN and a RIGHT JOIN?",
                    "options": {
                        "A": "A LEFT JOIN returns all rows from both tables, while a RIGHT JOIN returns only matching rows.",
                        "B": "A LEFT JOIN returns all rows from the left table, while a RIGHT JOIN returns all rows from the right table.",
                        "C": "A LEFT JOIN and a RIGHT JOIN are identical operations.",
                         "D":" A RIGHT JOIN is used when joining on multiple columns, while a LEFT JOIN is for a single column only."
                    },
                    "correct_answer": "B",
                    "explanation": "The key difference is that a LEFT JOIN prioritizes the left table, ensuring all its rows are included, while a RIGHT JOIN prioritizes the right table."
                }
            },
            {
                 "type": "mcq",
                 "source_content": "A FULL OUTER JOIN returns all rows when there is a match in either the left or the right table. If a row in one table doesn't have a match in the other table, NULL values are returned for the non-matching table columns.",
                 "question_data":{
                     "question": "Which JOIN type includes all rows from both tables, using NULL where no match is found?",
                     "options": {
                         "A":"INNER JOIN",
                         "B":"LEFT JOIN",
                         "C":"RIGHT JOIN",
                         "D":"FULL OUTER JOIN"
                     },
                     "correct_answer":"D",
                     "explanation": "A FULL OUTER JOIN returns all rows from both the left and right tables and uses NULL for the columns that do not have a corresponding value in other table"
                 }
            },
             {
                "type": "mcq",
                "source_content": "Self-joins are used when you need to join a table to itself. This is done using table aliases to differentiate between the table instances.",
                "question_data": {
                    "question": "What is a 'self-join' in SQL?",
                    "options": {
                        "A": "A join that combines rows from two different databases.",
                        "B": "A join that combines a table with a table which has a similar column name.",
                         "C": "A join that combines a table with itself.",
                        "D": "A join that uses only primary key columns."
                    },
                    "correct_answer": "C",
                    "explanation": "A self-join is a join operation where a table is joined with itself. It's used to compare values within the same table, using aliases to distinguish between the instances of the table."
                 }
            }
        ]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

'''@router.post("generate-exam", response_model=QuestionResponse)
async def generate_exam(request: QuestionRequest):
    try:
        exam = exam_pipeline(
            query=request.query,
            question_type=request.question_type,
            question_nbr=request.question_nbr,
            faiss_index=faiss_index,
            ollama_model=ollama_model,
            difficulty=request.difficulty,
            k=25,  # Retrieved documents
            top_n=5  # Re-ranked documents
        )
        return {"questions": exam["questions"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))'''