import { useState } from "react";
import Player from "./components/Player";
import SetupGame from "./components/SetupGame";
import StatusGame from "./components/StatusGame";
import randomNumber from "./components/basic/RandomNumber";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [statusPlayers, setStatusPlayers] = useState({
    activePlayer: 0,
    isAttacking: true,
    attacking: 0,
    defending: 1,
  });
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

  console.log("app playerData", playerData);
  console.log("app activePlayer", statusPlayers.activePlayer);
  console.log("app isAttacking", statusPlayers.isAttacking);

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
    const diceResult = randomNumber(1, 6);

    const resultQuestionsDice =
      diceResult * (parseInt(resultQuestions) + 1);

    const pointsAttackOrDefense = statusPlayers.isAttacking
      ? playerData[statusPlayers.activePlayer].power
      : playerData[statusPlayers.activePlayer].defense;

    const hitPoints = resultQuestionsDice * pointsAttackOrDefense;

    let healthActive = playerData[statusPlayers.activePlayer].health;

    // console.log("resultQuestions", resultQuestions);
    // console.log("resultQuestionsDice", resultQuestionsDice);
    // console.log("pointsAttackOrDefense", pointsAttackOrDefense);
    // console.log("hitPoints", hitPoints);

    setStatusPlayers((prevState) => ({
      ...prevState,
      activePlayer: prevState.activePlayer === 0 ? 1 : 0,
      isAttacking: !prevState.isAttacking,
    }));

    console.log("app attacking", statusPlayers.attacking);
    console.log("app defending", statusPlayers.defending);

    console.log(
      "playerData[statusPlayers.attacking].points",
      playerData[statusPlayers.attacking].points
    );

    console.log(
      "playerData[statusPlayers.defending].points",
      hitPoints
    );

    //Fim de round
    if (!statusPlayers.isAttacking) {
      const hitPointsDifference =
        playerData[statusPlayers.attacking].points - hitPoints;

      console.log(
        "FIM DE ROUND - hitPointsDifference",
        hitPointsDifference
      );

      healthActive =
        hitPointsDifference > 0
          ? healthActive - hitPointsDifference
          : healthActive;

      console.log("FIM DE ROUND - healthActive", healthActive);

      //Apenas no fim do round é que muda o status de quem está atacando e quem está defendendo.
      setStatusPlayers((prevState) => ({
        ...prevState,
        attacking: prevState.attacking === 0 ? 1 : 0,
        defending: prevState.defending === 0 ? 1 : 0,
      }));
    }

    setPlayerData(
      playerData.map((item) => {
        if (item.id === playerData[statusPlayers.activePlayer].id) {
          return {
            ...item,
            health: healthActive,
            points: hitPoints,
            dice: diceResult,
            multiplier:
              resultQuestions > 0
                ? parseInt(resultQuestions) + 1
                : resultQuestions,
          };
        } else {
          return item;
        }
      })
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
            activePlayer={statusPlayers.isAttacking}
            onNextTurn={handleNextTurn}
          />
        )}
      </div>
    </>
  );
}

export default App;
