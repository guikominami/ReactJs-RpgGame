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
  const playerPower = useRef();
  const playerDefense = useRef();

  // console.log("player", playerData);

  const [isEditing, setIsEditing] = useState(false);

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

    onAddNewPlayer({
      id: playerId,
      name: playerName.current.value,
      power: playerPower.current.value,
      defense: playerDefense.current.value,
    });

    playerName.current.value = "";
    playerPower.current.value = "";
    playerDefense.current.value = "";
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
        ref={playerPower}
      />
    );
    editingDefense = (
      <input
        type="text"
        placeholder="Defense"
        defaultValue={playerData.defense}
        ref={playerDefense}
      />
    );
    textButton = "Save";
  }

  let attackDefenseElement = (
    <>
      <span>
        <b>Health:</b> {playerData.health}
      </span>
      <span>
        <b>{"Hit points"}</b> {playerData.points}
      </span>
      <span>
        <b>Dice:</b> {playerData.dice}
      </span>
      <span>
        <b>Multiplier:</b> {playerData.multiplier > 1 && "x"}
        {playerData.multiplier}
      </span>
    </>
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
        {onGameStart && attackDefenseElement}
      </div>
      {!onGameStart && buttonEditElement}
    </section>
  );
}
