/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./basic/Button";
import "./StatusGame.css";
import questions from "../assets/questionsData.json";

// export default function StatusGame({ player, onNextTurn }) {
export default function StatusGame() {
  const [isQuestion, setIsQuestion] = useState(true);
  const [activePlayer, setActivePlayer] = useState(1);
  const [questionActive, setQuestionActive] = useState(
    randomNumberInRange(1, questions.length)
  );
  const [quantityAnswers, setQuantityAnswers] = useState({
    quantity: 0,
    correct: 0,
  });

  function handleNextTurnClick() {
    //verificar se é necessário voltar ao app
    // onNextTurn();

    setIsQuestion(true);

    setActivePlayer((curActivePlayer) =>
      curActivePlayer === 1 ? 2 : 1
    );

    // {questions.map((item) => (
  }

  function handleQuestionOption(option) {
    let correctAnswerCount = 0;

    const correctAnswer = questions[questionActive].answer;

    console.log("option selected", option);
    console.log("option correct", correctAnswer);

    if (option === correctAnswer) {
      console.log("correct!!!");
      correctAnswerCount = 1;
    }

    setQuantityAnswers({
      ...quantityAnswers,
      quantity: quantityAnswers.quantity + 1,
      correct: quantityAnswers.correct + correctAnswerCount,
    });

    setQuestionActive(randomNumberInRange(1, questions.length));

    console.log("quantity answers", quantityAnswers.quantity);
    console.log("correct answers", quantityAnswers.correct);

    if (quantityAnswers.quantity === 2) {
      setIsQuestion(false);
    }
  }

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <section className="status-game">
      <div className="status-game-column">
        <h2>Game Status</h2>
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
            <div className="question-options">
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
