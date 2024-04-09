import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import WebApp from "@twa-dev/sdk";
// import WheelComponent from "./components/Wheel";

// const segments = ["Happy", "Angry", "Sad", "Frustration", "Emptyness", "Hehe"];
// const segColors = ["#000", "#FFF", "#000", "#FFF", "#000", "#FFF"];

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

  // const onFinished = (winner: string) => {
  //   console.log(winner);
  // };

  useEffect(() => {
    WebApp.ready();
  }, []);

  useEffect(() => {
    if (question === 3) {
      WebApp.MainButton.text = "Submit";
      WebApp.MainButton.show();
      WebApp.MainButton.onClick(() => {
        toast.success("Congrats for completing our quiz!");
      });
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

      {/* <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment=""
        onFinished={(winner) => onFinished(winner)}
        primaryColor="black"
        primaryColoraround="transparent"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={190}
        upDuration={50}
        downDuration={2000}
      /> */}
      <div className="flex flex-col gap-6">
        {WebApp.initData}
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
