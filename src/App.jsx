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

  function handleAddNewPlayer(playerData) {
    console.log("receba", playerData);

    //NAO é para incluir o valor mais e sim atualizar
    setPlayerData((prevState) => {
      const newData = {
        playerData,
      };
      return {
        ...prevState,
        players: [...prevState.players, newData],
      };
    });
  }

  // console.log(playerData);

  function handleGameStart() {
    setIsGameStarted((value) => !value);
  }

  function selectDataPlayer(idBusca) {
    const selectedPlayer = playerData.find(
      (player) => player.id === idBusca
    );
    return selectedPlayer;
  }

  return (
    <>
      <div id="main-area">
        <Player
          playerData={selectDataPlayer(1)}
          onGameStart={isGameStarted}
          onAddNewPlayer={handleAddNewPlayer}
        />
        <Player
          playerData={selectDataPlayer(2)}
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
