import { NextResponse } from 'next/server';

const API_BASE_URL = 'http://localhost:8000/Exam/newexam'; // Backend URL

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse incoming request JSON
    const { query, questionNbr, difficulty, questionType } = body;
    
    // Ensure all required fields are present
    if (!query || !questionNbr || !difficulty || !questionType) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Forward the request to the backend
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: "string",
        question_nbr: 5,
        difficulty: "intermediate",
        question_type: "mcq"
      }),
    });
    
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Backend error response:', errorResponse);
      return NextResponse.json(
        { error: 'Failed to fetch the exam from the backend' },
        { status: response.status }
      );
    }

    // Parse and return the backend response
    const data = await response.json();
    console.log(await response.json());
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in fetching the exam:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
