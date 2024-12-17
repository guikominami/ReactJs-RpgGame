import { useState } from "react";
import Player from "./components/Player";
import SetupGame from "./components/SetupGame";
import StatusGame from "./components/StatusGame";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerData, setPlayerData] = useState([
    {
      id: 1,
      name: "Player 1",
      power: 10,
      defense: 10,
      health: 100,
    },
    {
      id: 2,
      name: "Player 2",
      power: 10,
      defense: 10,
      health: 100,
    },
  ]);

  // function handleSelectPlayer() {
  //   setActivePlayer((curActivePlayer) =>
  //     curActivePlayer === 1 ? 2 : 1
  //   );
  // }

  console.log("app", playerData);

  function handleAddNewPlayer(player) {
    console.log("receba", player);

    const oldPlayerData = [...playerData];
    const playerToUpdate = oldPlayerData.find(
      (p) => p.id === player.id
    );
    playerToUpdate.name = player.name;
    setPlayerData(oldPlayerData);
  }

  function handleGameStart() {
    setIsGameStarted((value) => !value);
  }

  return (
    <>
      <div id="main-area">
        <Player
          playerData={playerData[0]}
          onGameStart={isGameStarted}
          onAddNewPlayer={handleAddNewPlayer}
        />
        <Player
          playerData={playerData[1]}
          onGameStart={isGameStarted}
          onAddNewPlayer={handleAddNewPlayer}
        />
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
