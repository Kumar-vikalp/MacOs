import React, { useState } from 'react';

const Calculator = ({ windowId }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, op) => {
    switch (op) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '×': return firstValue * secondValue;
      case '÷': return firstValue / secondValue;
      default: return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  // Helper for button styles
  const btnBase = "flex items-center justify-center text-xl font-medium transition-all active:brightness-125 select-none h-12 w-full rounded-lg";
  const grayBtn = "bg-[#a5a5a5] text-black hover:bg-[#d4d4d2]";
  const darkBtn = "bg-[#333333] text-white hover:bg-[#4d4d4d]";
  const orangeBtn = "bg-[#ff9f0a] text-white hover:bg-[#ffb340]";

  const buttons = [
    { label: 'AC', onClick: clear, className: grayBtn },
    { label: '±', onClick: () => setDisplay(String(parseFloat(display) * -1)), className: grayBtn },
    { label: '⌫', onClick: handleBackspace, className: grayBtn },
    { label: '÷', onClick: () => inputOperation('÷'), className: orangeBtn },

    { label: '7', onClick: () => inputNumber(7), className: darkBtn },
    { label: '8', onClick: () => inputNumber(8), className: darkBtn },
    { label: '9', onClick: () => inputNumber(9), className: darkBtn },
    { label: '×', onClick: () => inputOperation('×'), className: orangeBtn },

    { label: '4', onClick: () => inputNumber(4), className: darkBtn },
    { label: '5', onClick: () => inputNumber(5), className: darkBtn },
    { label: '6', onClick: () => inputNumber(6), className: darkBtn },
    { label: '-', onClick: () => inputOperation('-'), className: orangeBtn },

    { label: '1', onClick: () => inputNumber(1), className: darkBtn },
    { label: '2', onClick: () => inputNumber(2), className: darkBtn },
    { label: '3', onClick: () => inputNumber(3), className: darkBtn },
    { label: '+', onClick: () => inputOperation('+'), className: orangeBtn },

    { label: '0', onClick: () => inputNumber(0), className: `${darkBtn} col-span-2 !justify-start pl-6` },
    { label: '.', onClick: inputDecimal, className: darkBtn },
    { label: '=', onClick: performCalculation, className: orangeBtn },
  ];

  return (
    <div className="h-full flex flex-col bg-[#1c1c1c] p-3 rounded-b-xl shadow-2xl">
      {/* Display Area */}
      <div className="flex-none flex flex-col justify-end items-end px-4 py-6 h-32">
        <div className="text-white text-5xl font-light tracking-tight truncate w-full text-right">
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="flex-1 grid grid-cols-4 gap-3 p-1">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`${btnBase} ${btn.className}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;