/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./basic/Button";
import DropDownQuiz from "./basic/DropDownQuiz";
import "./SetupGame.css";

export default function SetupGame({ onGameStart }) {
  const [isThemeSelected, setIsThemeSelected] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  console.log(isGameStarted);
  let buttonStartElement = (
    <>
      <Button
        onClick={handleStartGame}
        className={!isGameStarted ? "start" : "end"}
      >
        {!isGameStarted ? "Start Game" : "End Game"}
      </Button>
    </>
  );

  function handleStartGame() {
    onGameStart(setIsGameStarted((start) => !start));
  }

  return (
    <>
      <section className="setup-game">
        <div className="select-quiz">
          <DropDownQuiz onthemeSelected={setIsThemeSelected} />
          {isThemeSelected && buttonStartElement}
        </div>
      </section>
    </>
  );
}
