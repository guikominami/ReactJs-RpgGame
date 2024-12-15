/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./Button";

import "./DropDownQuiz.css";

export default function DropDownQuiz({ onthemeSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [quizTheme, setQuizTheme] = useState("Quiz theme");

  let optionsElement = (
    <ul>
      <li>
        <Button
          onClick={() => handleSelectOption("Games")}
          className="options"
        >
          Games
        </Button>
      </li>
      <li>
        <Button
          onClick={() => handleSelectOption("Geography")}
          className="options"
        >
          Geography
        </Button>
      </li>
      <li>
        <Button
          onClick={() => handleSelectOption("Geek")}
          className="options"
        >
          Geek
        </Button>
      </li>
      <li>
        <Button
          onClick={() => handleSelectOption("Math")}
          className="options"
        >
          Math
        </Button>
      </li>
    </ul>
  );

  function handleClick() {
    setIsOpen((opening) => !opening);
    setQuizTheme("Quiz theme:");
    onthemeSelected(false);
  }

  function handleSelectOption(option) {
    setQuizTheme(option);
    setIsOpen((opening) => !opening);
    onthemeSelected(true);
  }

  return (
    <>
      <div className="dropdown-area">
        <Button className="theme" onClick={handleClick}>
          {quizTheme}
        </Button>
        {isOpen && optionsElement}
      </div>
    </>
  );
}
