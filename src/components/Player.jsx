/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import "./Player.css";
import Button from "./basic/Button";

export default function Player() {
  const playerName = useRef();
  const playerClass = useRef();

  const [isEditing, setIsEditing] = useState(false);
  const [playerData, setPlayerData] = useState({
    name: "Player",
    class: "Undefined",
    power: 10,
    defense: 10,
  });

  function handleClick() {
    if (isEditing) {
      SaveData();
    }

    setIsEditing((editing) => !editing);
  }

  function SaveData() {
    console.log("save");
    if (playerName.current.value === "") {
      return;
    }

    setPlayerData({
      ...playerData,
      name: playerName.current.value,
      class: playerClass.current.value,
      power: 10,
      defense: 10,
    });

    playerName.current.value = "";
    playerClass.current.value = "";
  }

  let editingName = playerData.name;
  let editingClass = playerData.class;
  let editingPower = playerData.power;
  let editingDefense = playerData.defense;
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
    editingClass = (
      <input
        type="text"
        placeholder="Class"
        defaultValue={playerData.class}
        ref={playerClass}
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

  return (
    <section className="player">
      <div className="player_data">
        <h2>{editingName}</h2>
        <span>
          <b>Class: </b> {editingClass}
        </span>
        <span>
          <b>Power:</b> {editingPower}
        </span>
        <span>
          <b>Defense:</b> {editingDefense}
        </span>
      </div>
      <Button onClick={handleClick}>{textButton}</Button>
    </section>
  );
}
