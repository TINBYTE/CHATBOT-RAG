# MASD-QUIZ Web Application

MASD-QUIZ is a modern, AI-powered quiz and exam generation web application built using **Next.js**. The app provides an interactive user interface for students and educators to access dynamically generated quizzes and receive instant feedback.

---

## Features

- **Dynamic Quiz Generation**: Uses AI-powered tools to fetch and present personalized quizzes.
- **Real-Time Feedback**: Provides detailed feedback after quiz submission.
- **Interactive UI**: Built with Chakra UI and Tailwind CSS for a modern and responsive design.
- **Scalable and Modular Architecture**: Easily extensible for additional features.

---

## Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/) (v14.2.18)
- **UI Libraries**:
  - [Chakra UI](https://chakra-ui.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **React Ecosystem**:
  - [React Icons](https://react-icons.github.io/react-icons/)
  - [Framer Motion](https://www.framer.com/motion/) (for animations)
- **Code Formatting**: Prettier with Tailwind CSS plugin
- **TypeScript**: Ensures type safety across the application.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/masd-quiz.git
   cd masd-quiz
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

Here's an overview of the project structure:

```
masd-quiz/
├── components/          # Reusable UI components
├── pages/               # Application pages
│   ├── api/             # API routes for data fetching
│   └── index.tsx        # Home page
├── public/              # Static assets (images, icons, etc.)
├── styles/              # Global and module-specific styles
├── utils/               # Helper functions and utilities
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

---

## Scripts

The following scripts are available in the project:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm start`: Runs the built project in production mode.
- `npm run lint`: Lints the code for style and formatting issues.

---

## Dependencies

Key dependencies used in the project:

- **@chakra-ui/react**: For UI components
- **Tailwind CSS**: For responsive design
- **React Icons**: Icon library
- **Framer Motion**: Smooth animations
- **TypeScript**: Ensures type safety
- **Next.js**: The framework for building the application

Refer to the `package.json` file for the full list of dependencies.

---

## Feedback Generation Process

1. **Fetch Questions**: Data is retrieved from the backend RAG model.
2. **Interactive QCM**: Users interact with the quiz through the web interface.
3. **Answer Verification**: Submitted answers are sent to the backend for evaluation.
4. **Instant Feedback**: Grading results and explanations are displayed to the user.

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

Special thanks to the MASD-QUIZ team for their hard work and dedication:
 
- **Nordin & Youssef**: Knowledge Base Construction, Document Retrieval , Preprocessing and Question Generation .
- **Abdelfattah Bouhlali**: Answer Verification & User Interface Development  
