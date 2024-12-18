import { useState } from "react";
import Player from "./components/Player";
import SetupGame from "./components/SetupGame";
import StatusGame from "./components/StatusGame";
import randomNumber from "./components/basic/RandomNumber";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [activePlayer, setActivePlayer] = useState(0);
  const [isAttacking, setIsAttacking] = useState(true);
  const [playerData, setPlayerData] = useState([
    {
      id: 1,
      name: "Player 1",
      power: 10,
      defense: 10,
      health: 100,
      points: 0,
      dice: 0,
      multiplier: 0,
    },
    {
      id: 2,
      name: "Player 2",
      power: 10,
      defense: 10,
      health: 100,
      points: 0,
      dice: 0,
      multiplier: 0,
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
            power: parseInt(player.power),
            defense: parseInt(player.defense),
          };
        } else {
          return item;
        }
      })
    );
  }

  function handleGameStart() {
    setIsGameStarted((value) => !value);
  }

  function handleNextTurn(resultQuestions) {
    let diceResult = randomNumber(1, 6);
    let resultAttackDefense =
      diceResult * (parseInt(resultQuestions) + 1);

    let pointsMultiplier =
      playerData[activePlayer].power * resultAttackDefense;

    if (!isAttacking) {
      pointsMultiplier =
        playerData[activePlayer].defense * resultAttackDefense;
    }

    console.log("resultQuestions", resultQuestions);
    console.log("diceResult", diceResult);
    console.log("resultAttackDefense", resultAttackDefense);
    console.log("pointsMultiplier", pointsMultiplier);

    setActivePlayer((curActivePlayer) =>
      curActivePlayer === 0 ? 1 : 0
    );

    setPlayerData(
      playerData.map((item) => {
        if (item.id === playerData[activePlayer].id) {
          return {
            ...item,
            points: pointsMultiplier,
            dice: diceResult,
            multiplier: parseInt(resultQuestions) + 1,
          };
        } else {
          return item;
        }
      })
    );
  }

  function handleSelectAttackingPlayer() {
    console.log("activePlayer", activePlayer);
    setIsAttacking((curActivePlayerAction) =>
      curActivePlayerAction === 0 ? 1 : 0
    );
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
