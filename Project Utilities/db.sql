-- Create the "users" table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the "quizzes" table
CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    prompt TEXT NOT NULL,
    title VARCHAR(255) DEFAULT 'Generated Quiz',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the "questions" table
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_text TEXT NOT NULL,
    question_type ENUM('mcq', 'open-ended') NOT NULL,
    correct_option INT,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Create the "options" table
CREATE TABLE options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    option_text TEXT NOT NULL,
    option_index INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Create the "quiz_attempts" table
CREATE TABLE quiz_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    user_id INT NOT NULL,
    score DECIMAL(5, 2),
    passed BOOLEAN NOT NULL,
    attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the "user_answers" table
CREATE TABLE user_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attempt_id INT NOT NULL,
    question_id INT NOT NULL,
    user_response TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Insert sample users
INSERT INTO users (username, email, password_hash) VALUES
('john_doe', 'john@example.com', 'hashed_password_1'),
('jane_doe', 'jane@example.com', 'hashed_password_2');

-- Insert a sample quiz
INSERT INTO quizzes (user_id, prompt, title) VALUES
(1, 'Create a quiz about SQL basics', 'SQL Basics Quiz');

-- Insert sample questions
INSERT INTO questions (quiz_id, question_text, question_type, correct_option, explanation) VALUES
(1, 'Which SQL keyword is used to retrieve data from a database?', 'mcq', 2, 'The SELECT statement is used to retrieve data from a database.'),
(1, 'What does the SQL JOIN operation do?', 'mcq', 1, 'JOIN is used to combine rows from two or more tables.');

-- Insert sample options for question 1
INSERT INTO options (question_id, option_text, option_index) VALUES
(1, 'INSERT', 0),
(1, 'DELETE', 1),
(1, 'SELECT', 2),
(1, 'UPDATE', 3);

-- Insert sample options for question 2
INSERT INTO options (question_id, option_text, option_index) VALUES
(2, 'Deletes rows from a table', 0),
(2, 'Combines rows from two or more tables', 1),
(2, 'Updates rows in a table', 2),
(2, 'Adds a new table to the database', 3);

-- Insert a sample quiz attempt
INSERT INTO quiz_attempts (quiz_id, user_id, score, passed) VALUES
(1, 1, 100.00, TRUE);

-- Insert sample user answers
INSERT INTO user_answers (attempt_id, question_id, user_response, is_correct) VALUES
(1, 1, 'SELECT', TRUE),
(1, 2, 'Combines rows from two or more tables', TRUE);
