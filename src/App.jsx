import { useState, useRef } from "react";
import Player from "./components/Player";
import SetupGame from "./components/SetupGame";
import StatusGame from "./components/StatusGame";
import randomNumber from "./components/basic/RandomNumber";
import Modal from "./components/basic/Modal";
import RoundSummary from "./components/basic/RoundSummary";

function App() {
  const modal = useRef();

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const [statusPlayers, setStatusPlayers] = useState({
    activePlayer: 0,
    isAttacking: true,
    attacking: 0,
    defending: 1,
  });
  const [playerData, setPlayerData] = useState([
    {
      id: 0,
      name: "Player 1",
      power: 10,
      defense: 10,
      health: 1000,
      points: 0,
      dice: 0,
      multiplier: 0,
    },
    {
      id: 1,
      name: "Player 2",
      power: 10,
      defense: 10,
      health: 1000,
      points: 0,
      dice: 0,
      multiplier: 0,
    },
  ]);

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

    //let healthActive = playerData[statusPlayers.activePlayer].health;

    //ALTERADO PARA Só atualizar a saúde depois de fechar o modal
    // if (!statusPlayers.isAttacking) {
    //   console.log("recebendo dano");
    //   const hitPointsDifference =
    //     playerData[statusPlayers.attacking].points - hitPoints;

    //   healthActive =
    //     hitPointsDifference > 0
    //       ? healthActive - hitPointsDifference
    //       : healthActive;
    // }

    setPlayerData(
      playerData.map((item) => {
        if (item.id === playerData[statusPlayers.activePlayer].id) {
          return {
            ...item,
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

    if (statusPlayers.isAttacking) {
      //Fim de turno é quando acabou o ataque
      setStatusPlayers((prevState) => ({
        ...prevState,
        activePlayer: prevState.activePlayer === 0 ? 1 : 0,
        isAttacking: !prevState.isAttacking,
      }));
    } else {
      // setTimeout(() => {
      //   modal.current.open();
      // }, 1000);
      setIsRoundFinished((roundStatus) => !roundStatus);
    }
  }

  function handleSubmitResultAttackDefense() {
    setIsRoundFinished((roundStatus) => !roundStatus);
    modal.current.open();
  }

  function handleEndOfRound() {
    //Apenas no fim do round é que muda o status de quem está atacando e quem está defendendo.
    //ROUND 1: atacando 0 defendendo 1
    //ROUND 2: atacando 1 defendendo 0
    console.log("FIM DE ROUND");

    const hitPointsDifference =
      playerData[statusPlayers.attacking].points -
      playerData[statusPlayers.defending].points;

    let healthActive = playerData[statusPlayers.activePlayer].health;

    setPlayerData(
      playerData.map((item) => {
        if (item.id === playerData[statusPlayers.activePlayer].id) {
          return {
            ...item,
            health:
              hitPointsDifference > 0
                ? healthActive - hitPointsDifference
                : healthActive,
            points: 0,
            dice: 0,
            multiplier: 0,
          };
        } else {
          return {
            ...item,
            points: 0,
            dice: 0,
            multiplier: 0,
          };
        }
      })
    );

    setStatusPlayers((prevState) => ({
      ...prevState,
      activePlayer: prevState.attacking === 0 ? 1 : 0,
      isAttacking: !prevState.isAttacking,
      attacking: prevState.attacking === 0 ? 1 : 0,
      defending: prevState.defending === 1 ? 0 : 1,
    }));

    // setPlayerData(
    //   playerData.map((item) => {
    //     return {
    //       ...item,
    //       points: 0,
    //       dice: 0,
    //       multiplier: 0,
    //     };
    //   })
    // );
  }

  return (
    <>
      <Modal
        ref={modal}
        buttonCaption="Ok"
        onClick={handleEndOfRound}
      >
        <RoundSummary
          playerAttack={playerData[statusPlayers.attacking]}
          playerDefend={playerData[statusPlayers.defending]}
        />
      </Modal>
      <div id="main-area">
        <Player
          playerData={playerData[0]}
          onGameStart={isGameStarted}
          onAddNewPlayer={handleAddNewPlayer}
          activePlayer={statusPlayers.activePlayer}
        />
        <Player
          playerData={playerData[1]}
          onGameStart={isGameStarted}
          onAddNewPlayer={handleAddNewPlayer}
          activePlayer={statusPlayers.activePlayer}
        />

        <SetupGame
          onGameStart={handleGameStart}
          turnResult1={playerData[0]}
          turnResult2={playerData[1]}
        />
        {isGameStarted && (
          <>
            <StatusGame
              onNextTurn={handleNextTurn}
              isAttacking={statusPlayers.isAttacking}
              playerNameAttacking={
                playerData[statusPlayers.attacking].name
              }
              playerNameDefending={
                playerData[statusPlayers.defending].name
              }
              isRoundFinished={isRoundFinished}
              onFinishRound={handleSubmitResultAttackDefense}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
