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
  let playerActive = playerData.active;
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

  let healthElement = <></>;

  let attackElement = (
    <span>
      <b>Attack:</b> {playerData.attack}
    </span>
  );

  let blockElement = (
    <span>
      <b>Block:</b> {playerData.block}
    </span>
  );

  let questionsResultElement = (
    <>
      <span>
        <b>Dice:</b> {playerData.block}
      </span>
      <span>
        <b>Multiplier:</b> {playerData.block}
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
        <span>
          <b>Health:</b> {playerData.health}
        </span>
        {onGameStart && healthElement}
        {onGameStart && (playerActive ? attackElement : blockElement)}
        {onGameStart && questionsResultElement}
      </div>
      {!onGameStart && buttonEditElement}
    </section>
  );
}
