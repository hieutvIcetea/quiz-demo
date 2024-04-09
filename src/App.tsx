import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import WebApp from "@twa-dev/sdk";

const QUIZ = {
  quiz_title: "Science Quiz",
  questions: [
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      answer: "H2O",
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic reticulum"],
      answer: "Mitochondria",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Jupiter", "Mars", "Venus", "Saturn"],
      answer: "Mars",
    },
  ],
};

function App() {
  const [question, setQuestion] = useState(0);

  useEffect(() => {
    WebApp.ready();
  }, []);

  useEffect(() => {
    if (question === 3) {
      WebApp.MainButton.text = "Main button";
      WebApp.MainButton.show();
      WebApp.MainButton.onClick(() => WebApp.close);
    }
  }, [question]);

  const submitAnswer = (answer: string) => {
    if (QUIZ.questions[question].answer === answer) {
      setQuestion(question + 1);
      return;
    }
    toast.error("wrong answer");
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <Toaster />
      <div className="flex flex-col gap-6">
        {question < 3 && (
          <>
            <h1>{QUIZ.questions[question].question}</h1>
            {QUIZ.questions[question].options.map((item) => (
              <Button
                key={item}
                className="px-3 py-2 border rounded w-fit bg-slate-300 hover:bg-emerald-400"
                onClick={() => submitAnswer(item)}
              >
                {item}
              </Button>
            ))}
          </>
        )}
        {question === 3 && <h1>Congrats!</h1>}
        {/* {QUIZ.questions.map((item) => (
          <Button
            className="px-3 py-2 border rounded w-fit bg-slate-300 hover:bg-emerald-400"
            onClick={setAnswer(item.)}
          >
            {item.question}
          </Button>
        ))} */}
      </div>
    </div>
  );
}

export default App;
