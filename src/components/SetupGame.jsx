import { useState } from "react";
import Button from "./basic/Button";
import DropDownQuiz from "./basic/DropDownQuiz";
import "./SetupGame.css";

export default function SetupGame() {
  const [isThemeSelected, setIsThemeSelected] = useState(false);

  let buttonStartElement = (
    <>
      <Button onClick={handleStartGame} className="options">
        Start Game
      </Button>
    </>
  );

  function handleStartGame() {}

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
