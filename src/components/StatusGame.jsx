/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./basic/Button";
import "./StatusGame.css";
import questions from "../assets/questionsData.json";
import randomNumber from "../components/basic/RandomNumber";

export default function StatusGame({ isAttacking, onNextTurn }) {
  const [isQuestion, setIsQuestion] = useState(true);
  const [questionActive, setQuestionActive] = useState(
    randomNumber(1, questions.length)
  );
  const [quantityAnswers, setQuantityAnswers] = useState({
    quantity: 0,
    correct: 0,
  });

  function handleNextTurnClick() {
    setIsQuestion(true);

    setQuantityAnswers({
      ...quantityAnswers,
      quantity: 0,
      correct: 0,
    });

    //if isAttacking for false, end the round
    onNextTurn(quantityAnswers.correct);
  }

  function handleQuestionOption(option) {
    let correctAnswerCount = 0;

    const correctAnswer = questions[questionActive].answer;

    if (option === correctAnswer) {
      correctAnswerCount = 1;
    }

    setQuantityAnswers({
      ...quantityAnswers,
      quantity: quantityAnswers.quantity + 1,
      correct: quantityAnswers.correct + correctAnswerCount,
    });

    setQuestionActive(randomNumber(1, questions.length));

    if (quantityAnswers.quantity === 2) {
      setIsQuestion(false);
    }
  }

  return (
    <section className="status-game">
      <div className="status-game-column">
        <h2>
          Game Status - Answer for{" "}
          {isAttacking ? "attack" : "defense"}
        </h2>
        {isQuestion && (
          <>
            <p>
              <b>Question: </b>
              {questions[questionActive].question}
            </p>

            <div className="question-options">
              <Button onClick={() => handleQuestionOption("A")}>
                {questions[questionActive].A}
              </Button>
              <Button onClick={() => handleQuestionOption("B")}>
                {questions[questionActive].B}
              </Button>
              <Button onClick={() => handleQuestionOption("C")}>
                {questions[questionActive].C}
              </Button>
              <Button onClick={() => handleQuestionOption("D")}>
                {questions[questionActive].D}
              </Button>
            </div>
          </>
        )}
        {!isQuestion && (
          <>
            <div className="next-turn">
              <p>
                You answered {quantityAnswers.correct} correct from{" "}
                {quantityAnswers.quantity} questions!
              </p>
              <Button onClick={handleNextTurnClick}>Next Turn</Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
