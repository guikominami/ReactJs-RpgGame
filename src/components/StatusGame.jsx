/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./basic/Button";
import "./StatusGame.css";
import questions from "../assets/questionsData.json";
import randomNumber from "../components/basic/RandomNumber";

export default function StatusGame({
  playerBoardId,
  onNextTurn,
  activePlayer,
}) {
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
        {isQuestion &&
          parseInt(playerBoardId) === parseInt(activePlayer) && (
            <>
              <p>
                <b>ANSWER FOR ATTACK/DEFENSE</b>
              </p>
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
        {!isQuestion &&
          parseInt(playerBoardId) === parseInt(activePlayer) && (
            <>
              <div className="next-turn">
                <p>
                  You answered {quantityAnswers.correct} correct from{" "}
                  {quantityAnswers.quantity} questions!
                </p>
                <Button onClick={handleNextTurnClick}>
                  Next Turn
                </Button>
              </div>
            </>
          )}
      </div>
    </section>
  );
}
