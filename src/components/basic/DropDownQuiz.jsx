import { useState } from "react";
import Button from "./Button";

import "./DropDownQuiz.css";

export default function DropDownQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [quizTheme, setQuizTheme] = useState("QUIZ THEME:");
  const [isThemeSelected, setIsThemeSelected] = useState(false);

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

  let buttonStartElement = <Button>Start</Button>;

  function handleClick() {
    setIsOpen((opening) => !opening);
    setQuizTheme("QUIZ THEME:");
    if (isThemeSelected) setIsThemeSelected((selected) => !selected);
  }

  function handleSelectOption(option) {
    setQuizTheme(option);
    setIsOpen((opening) => !opening);
    setIsThemeSelected((selected) => !selected);
  }

  return (
    <>
      <div className="dropdown-area">
        <Button className="theme" onClick={handleClick}>
          {quizTheme}
        </Button>
        {isOpen && optionsElement}
      </div>
      {isThemeSelected && buttonStartElement}
    </>
  );
}
