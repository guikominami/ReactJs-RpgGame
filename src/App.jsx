import { useState } from "react";
import Player from "./components/Player";
import SetupGame from "./components/SetupGame";
import StatusGame from "./components/StatusGame";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [activePlayer, setActivePlayer] = useState(0);
  const [playerData, setPlayerData] = useState([
    {
      id: 1,
      name: "Player 1",
      power: 10,
      defense: 10,
      health: 100,
      attack: 0,
      block: 0,
      dice: 0,
      multiplier: 0,
      active: true,
    },
    {
      id: 2,
      name: "Player 2",
      power: 10,
      defense: 10,
      health: 100,
      attack: 0,
      block: 0,
      dice: 0,
      multiplier: 0,
      active: false,
    },
  ]);

  console.log("app", playerData);

  function handleAddNewPlayer(player) {
    setPlayerData(
      playerData.map((item) => {
        if (item.id === player.id) {
          return {
            ...item,
            name: player.name,
            power: player.power,
            defense: player.defense,
          };
        } else {
          return item;
        }
      })
    );
  }

  function handleUpdatePlayerStatus(player, playerProperty, status) {
    setPlayerData(
      playerData.map((item) => {
        if (item.id === player.id) {
          return {
            ...item,
            playerProperty: status,
          };
        } else {
          return item;
        }
      })
    );
  }

  function handleGameStart() {
    setIsGameStarted((value) => !value);
    handleSelectActivePlayer();
  }

  function handleNextTurn(resultQuestions) {
    setActivePlayer((curActivePlayer) =>
      curActivePlayer === 0 ? 1 : 0
    );

    console.log(resultQuestions);

    handleUpdatePlayerStatus(
      playerData[activePlayer],
      "attack",
      resultQuestions
    );
  }

  function handleSelectActivePlayer() {
    console.log("activePlayer", activePlayer);
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
          <StatusGame
            activePlayer={activePlayer}
            onNextTurn={handleNextTurn}
            power={playerData[activePlayer].power}
            defense={playerData[activePlayer].defense}
          />
        )}
      </div>
    </>
  );
}

export default App;
