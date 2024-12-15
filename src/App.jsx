import { useState } from "react";
import Player from "./components/Player";
import SetupGame from "./components/SetupGame";
import StatusGame from "./components/StatusGame";
const isGameStarted = 0;
function App() {
  console.log("app", isGameStarted);
  return (
    <>
      <div id="main-area">
        <Player />
        <Player />
        <SetupGame onGameStart={isGameStarted} />
        <StatusGame />
      </div>
    </>
  );
}

export default App;
