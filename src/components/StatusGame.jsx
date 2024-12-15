import Button from "./basic/Button";
import DropDownQuiz from "./basic/DropDownQuiz";

import "./StatusGame.css";

let elementStatus = (
  <>
    <h2>Status Game</h2>
    <p>Player 1 attacked player 2</p>
    <p>Pergunta: O que é isso?</p>
    <p>Opções: 1- 2- 3- </p>
    <p>Resposta correta</p>
  </>
);

export default function StatusGame() {
  return (
    <>
      <section className="status-game">
        <div className="main-status-game">
          <span>Select the Quiz question theme:</span>
          <DropDownQuiz />
        </div>
      </section>
      {/* <Button>START GAME</Button> */}
    </>
    // <section className="status-game">

    //   <div className="main-status-game"></div>
    // </section>
  );
}
