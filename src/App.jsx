import { useState } from "react";
import "./App.scss";

const App = () => {
  const [display, setDisplay] = useState("0");
  const [currentInput, setCurrentInput] = useState("");
  const [prevInput, setPrevInput] = useState("");
  const [operator, setOperator] = useState(null);
  const [memory, setMemory] = useState(0);

  const setDisplayLimit = (value) => {
    if (value.length <= 10) {
      setDisplay(value);
    } else {
      setDisplay(parseFloat(value).toExponential(4));
    }
  };

  const handleNumberClick = (number) => {
    if (currentInput === "" || currentInput === "0") {
      setCurrentInput(number);
      setDisplayLimit(number);
    } else {
      setCurrentInput(currentInput + number);
      setDisplayLimit(currentInput + number);
    }
  };

  const calculate = () => {
    if (currentInput === 0) return;
    const currentValue = parseFloat(currentInput);
    const prevValue = parseFloat(prevInput);

    switch (operator) {
      case "+":
        setDisplayLimit(String(prevValue + currentValue));
        setPrevInput(String(prevValue + currentValue));
        break;
      case "-":
        setDisplayLimit(String(prevInput - currentValue));
        setPrevInput(String(prevInput - currentValue));
        break;
      case "*":
        setDisplayLimit(String(prevInput * currentValue));
        setPrevInput(String(prevInput * currentValue));
        break;
      case "/":
        setDisplayLimit(String(prevInput / currentValue));
        setPrevInput(String(prevInput / currentValue));
        break;
      default:
        setPrevInput(currentValue);
        break;
    }
  };

  const handleOperatorClick = (op) => {
    if (operator) {
      calculate();
    }
    setOperator(op);
    setCurrentInput("");
    if (prevInput === "") {
      setPrevInput(currentInput);
    }
  };

  const handleEqualClick = () => {
    if (operator) {
      calculate();
    }
    setPrevInput(prevInput);
  };

  const handleClearClick = () => {
    setDisplay("0");
    setCurrentInput("");
    setPrevInput("");
    setOperator(null);
  };

  const handleBackspace = () => {
    if (currentInput.length > 1) {
      setCurrentInput(currentInput.slice(0, -1));
      setDisplayLimit(display.slice(0, -1));
    } else {
      setCurrentInput(0);
      setDisplay(0);
    }
  };

  const handleMemoryPlus = () => {
    if (memory != 0) {
      const mem = parseFloat(memory);
      const dis = parseFloat(display);
      setMemory(mem + dis);
    } else {
      setMemory(display);
    }
  };

  const handleMemoryRecall = () => {
    setDisplayLimit(memory);
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  return (
    <div className="App">
      <main className="calculator">
        <div className="display">
          <p>
            {prevInput ? prevInput : ""}
            {operator ? operator : ""}
            {currentInput ? currentInput : 0} =
          </p>
          <h1>{display}</h1>
        </div>
        <div className="buttons">
          {[
            "M+",
            "MR",
            "MC",
            "⌫",
            7,
            8,
            9,
            "+",
            4,
            5,
            6,
            "-",
            1,
            2,
            3,
            "*",
            "AC",
            ".",
            0,
            "/",
            "=",
          ].map((button) => (
            <button
              key={button}
              onClick={() => {
                if (typeof button === "number" || button === ".") {
                  handleNumberClick(String(button));
                } else if (button === "=") {
                  handleEqualClick();
                } else if (button === "AC") {
                  handleClearClick();
                } else if (button === "M+") {
                  handleMemoryPlus();
                } else if (button === "MR") {
                  handleMemoryRecall();
                } else if (button === "MC") {
                  handleMemoryClear();
                } else if (button === "⌫") {
                  handleBackspace();
                } else {
                  handleOperatorClick(button);
                }
              }}
              className={
                typeof button === "number"
                  ? "number-button"
                  : button === "AC"
                  ? "clear-button"
                  : button === "="
                  ? "equal-button"
                  : button === "M+" || button === "MR" || button === "MC"
                  ? "memory-button"
                  : button === "⌫"
                  ? "backspace-button"
                  : "operator-button"
              }
            >
              {button}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
