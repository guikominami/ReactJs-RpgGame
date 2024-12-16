import { useState } from "react";
import Player from "./components/Player";
import SetupGame from "./components/SetupGame";
import StatusGame from "./components/StatusGame";
import ReadData from "./components/ReadData";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  // const [activePlayer, setActivePlayer] = useState(1);

  // function handleSelectPlayer() {
  //   setActivePlayer((curActivePlayer) =>
  //     curActivePlayer === 1 ? 2 : 1
  //   );
  // }

  function handleGameStart() {
    setIsGameStarted((value) => !value);
  }

  return (
    <>
      <div id="main-area">
        {/* <ReadData /> */}
        <Player onGameStart={isGameStarted} />
        <Player onGameStart={isGameStarted} />
        <SetupGame onGameStart={handleGameStart} />
        {isGameStarted && (
          <StatusGame />
          // <StatusGame
          //   onNextTurn={handleSelectPlayer}
          //   player={activePlayer}
          // />
        )}
      </div>
    </>
  );
}

export default App;
