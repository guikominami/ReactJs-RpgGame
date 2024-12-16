import { useState } from "react";
import Player from "./components/Player";
import SetupGame from "./components/SetupGame";
import StatusGame from "./components/StatusGame";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  console.log("app", isGameStarted);
  function handleGameStart() {
    setIsGameStarted((value) => !value);
  }

  return (
    <>
      <div id="main-area">
        <Player onGameStart={isGameStarted} />
        <Player onGameStart={isGameStarted} />
        <SetupGame onGameStart={handleGameStart} />
        {isGameStarted && <StatusGame />}
      </div>
    </>
  );
}

export default App;
