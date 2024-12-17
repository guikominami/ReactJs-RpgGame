/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import "./Player.css";
import Button from "./basic/Button";

export default function Player({
  playerData,
  onGameStart,
  onAddNewPlayer,
}) {
  const playerName = useRef();

  console.log("player", playerData);

  const [isEditing, setIsEditing] = useState(false);
  // const [playerData, setPlayerData] = useState({
  //   name: "Player",
  //   power: 10,
  //   defense: 10,
  //   health: 100,
  // });

  function handleClick() {
    if (isEditing) {
      SaveData();
    }

    setIsEditing((editing) => !editing);
  }

  function SaveData() {
    if (playerName.current.value === "") {
      return;
    }

    // setPlayerData({
    //   ...playerData,
    //   name: playerName.current.value,
    //   power: 10,
    //   defense: 10,
    // });

    onAddNewPlayer({
      id: playerId,
      name: playerName.current.value,
      power: 10,
      defense: 10,
    });

    playerName.current.value = "";
  }

  let editingName = playerData.name;
  let editingPower = playerData.power;
  let editingDefense = playerData.defense;
  let playerId = playerData.id;
  let textButton = "Edit";

  if (isEditing) {
    editingName = (
      <input
        type="text"
        placeholder="Name"
        defaultValue={playerData.name}
        ref={playerName}
      />
    );
    editingPower = (
      <input
        type="text"
        placeholder="Power"
        defaultValue={playerData.power}
      />
    );
    editingDefense = (
      <input
        type="text"
        placeholder="Defense"
        defaultValue={playerData.defense}
      />
    );
    textButton = "Save";
  }

  let healthElement = (
    <span>
      <b>Health:</b> {playerData.health}
    </span>
  );

  let buttonEditElement = (
    <Button onClick={handleClick}>{textButton}</Button>
  );

  return (
    <section className="player">
      <div className="player_data">
        <h2>{editingName}</h2>
        <span>
          <b>Power:</b> {editingPower}
        </span>
        <span>
          <b>Defense:</b> {editingDefense}
        </span>
        {onGameStart && healthElement}
      </div>
      {!onGameStart && buttonEditElement}
    </section>
  );
}
