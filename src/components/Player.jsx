/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import "./Player.css";

export default function Player() {
  const playerName = useRef();
  const playerClass = useRef();

  const [isEditing, setIsEditing] = useState(false);
  const [playerNameData, setPlayerName] = useState("Player");

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

    setPlayerName(playerName.current.value);

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

  let editingName = <h2>{playerNameData}</h2>;
  let editingClass = (
    <span>
      <b>Class:</b> {playerData.class}
    </span>
  );
  let editingPower = (
    <span>
      <b>Power:</b> {playerData.power}
    </span>
  );
  let editingDefense = (
    <span>
      <b>Defense:</b> {playerData.defense}
    </span>
  );
  let textButton = "Edit";

  if (isEditing) {
    editingName = (
      <input type="text" placeholder="Name" ref={playerName} />
    );
    editingClass = (
      <input type="text" placeholder="Class" ref={playerClass} />
    );
    editingPower = <input type="text" placeholder="Power" />;
    editingDefense = <input type="text" placeholder="Defense" />;
    textButton = "Save";
  }

  return (
    <section className="player">
      <div className="player_data">
        {editingName}
        {editingClass}
        {editingPower}
        {editingDefense}
        <button onClick={handleClick}>{textButton}</button>
      </div>
    </section>
  );
}
