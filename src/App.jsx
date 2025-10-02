import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [isNameDisplayed, setIsNameDisplayed] = useState(false);
  // FIX: Add a new state to track if the current display value is an answer.
  const [isAnswerDisplayed, setIsAnswerDisplayed] = useState(false);

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      setIsNameDisplayed(false);
      // FIX: Reset the new state when clearing.
      setIsAnswerDisplayed(false);
    } else if (value === "=") {
      try {
        // Prevent error on empty input
        if (input === "") {
            setInput("");
            return;
        }
        const result = eval(input);
        setInput(String(result));
        // FIX: Set the answer flag to true after a successful calculation.
        setIsAnswerDisplayed(true);
      } catch {
        setInput("Error");
        setIsAnswerDisplayed(true); // Treat "Error" as an answer that should be cleared
      }
      setIsNameDisplayed(false);
    } else if (value === "MANDAP") {
      setInput("John Adrielle Mandap");
      setIsNameDisplayed(true);
      // FIX: Reset the answer state when displaying the name.
      setIsAnswerDisplayed(false);
    } else {
      const isOperator = ["+", "-", "*", "÷"].includes(value);

      // FIX: This is the core logic change.
      // If a name is displayed, the next button press clears it.
      if (isNameDisplayed) {
        setInput(value === "÷" ? "/" : value);
        setIsNameDisplayed(false);
      // If an answer is displayed, the next button press will handle it.
      } else if (isAnswerDisplayed) {
        // If the button is an operator, continue the calculation with the answer.
        if (isOperator) {
          setInput(input + (value === "÷" ? "/" : value));
        // If the button is a number, clear the answer and start a new input.
        } else {
          setInput(value === "÷" ? "/" : value);
        }
        // Set the flag to false after the first button press.
        setIsAnswerDisplayed(false);
      } else {
        // Default behavior: just append the value to the input string.
        setInput(input + (value === "÷" ? "/" : value));
      }
    }
  };

  return (
    <div className="app">
      <h2>Calculator of John Adrielle Mandap - IT3B</h2>
      <div className="calculator">
        <div className="display">{input || "0"}</div>
        <div className="buttons">
          {[
            "7", "8", "9", "÷",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "C", "0", "=", "+",
          ].map((btn) => (
            <button
              key={btn}
              className={`btn ${btn === "C" ? "btn-clear" : ""} ${
                btn === "=" ? "btn-equal" : ""
              }`}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
        <button className="btn-surname" onClick={() => handleClick("MANDAP")}>
          MANDAP
        </button>
      </div>
    </div>
  );
}
