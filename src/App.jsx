import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [isNameDisplayed, setIsNameDisplayed] = useState(false);

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      setIsNameDisplayed(false);
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
      setIsNameDisplayed(false);
    } else if (value === "MANDAP") {
      setInput("John Adrielle Mandap");
      setIsNameDisplayed(true);
    } else {
      if (isNameDisplayed) {
        setInput(value === "÷" ? "/" : value);
        setIsNameDisplayed(false);
      } else {
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
          {["7","8","9","÷","4","5","6","*","1","2","3","-","C","0","=","+"].map((btn) => (
            <button 
              key={btn} 
              className={`btn ${btn === "C" ? "btn-clear" : ""} ${btn === "=" ? "btn-equal" : ""}`}
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
