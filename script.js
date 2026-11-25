
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "¡No se puede dividir por cero!";
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      return null;
  }
}

function updateDisplay(value) {
  display.textContent = value;
}

function roundResult(number) {
  return Math.round(number * 100000000) / 100000000;
}

function inputNumber(number) {
  if (display.textContent === "¡No se puede dividir por cero!") {
    updateDisplay("0");
  }

  if (waitingForSecondNumber) {
    updateDisplay(number);
    waitingForSecondNumber = false;
  } else {
    updateDisplay(
      display.textContent === "0"
        ? number
        : display.textContent + number
    );
  }
}

function inputDecimal() {
  if (waitingForSecondNumber) {
    updateDisplay("0.");
    waitingForSecondNumber = false;
    return;
  }

  if (!display.textContent.includes(".")) {
    updateDisplay(display.textContent + ".");
  }
}

function chooseOperator(nextOperator) {
  const inputValue = Number(display.textContent);

  if (operator && !waitingForSecondNumber) {
    const result = operate(operator, firstNumber, inputValue);

    if (typeof result === "string") {
      updateDisplay(result);
      firstNumber = null;
      operator = null;
      waitingForSecondNumber = true;
      return;
    }

    firstNumber = roundResult(result);
    updateDisplay(firstNumber);
  } else {
    firstNumber = inputValue;
  }

  operator = nextOperator;
  waitingForSecondNumber = true;
}

function calculate() {
  if (operator === null || waitingForSecondNumber) return;

  const secondNumber = Number(display.textContent);
  const result = operate(operator, firstNumber, secondNumber);

  if (typeof result === "string") {
    updateDisplay(result);
  } else {
    updateDisplay(String(roundResult(result)));
  }

  firstNumber = null;
  operator = null;
  waitingForSecondNumber = true;
}

function clearCalculator() {
  updateDisplay("0");
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
}

function deleteNumber() {
  if (waitingForSecondNumber) return;

  const currentValue = display.textContent;

  if (currentValue.length <= 1) {
    updateDisplay("0");
  } else {
    updateDisplay(currentValue.slice(0, -1));
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("clear")) {
      clearCalculator();
    } else if (button.classList.contains("delete")) {
      deleteNumber();
    } else if (button.classList.contains("operator")) {
      chooseOperator(value);
    } else if (button.classList.contains("equals")) {
      calculate();
    } else if (button.classList.contains("decimal")) {
      inputDecimal();
    } else {
      inputNumber(value);
    }
  });
});
