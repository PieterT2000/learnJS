class Calculator {
  constructor() {
    this.add = (a, b) => a + b;
    this.subtract = (a, b) => a - b;
    this.multiply = (a, b) => a * b;
    this.divide = (a, b) => a / b;
  }
}

const calcWrapper = document.querySelector(".calculator");
const calc = new Calculator(calcWrapper);

let state = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: true,
  operator: null
};

const calcButtons = calcWrapper.querySelector(".buttons");
const operatorButtons = calcButtons.querySelector(".col-1");
operatorButtons.addEventListener("click", e => {
  const operator = e.target.dataset.action;

  if (operator === "enter" && !state.waitingForSecondOperand) {
    secondOperand = parseFloat(display.textContent);
    display.textContent = calc[state.operator](
      state.firstOperand,
      secondOperand
    );
  }

  // calc[operation](arg1, arg2);

  // 1. save typedDigit to var
  state.firstOperand = parseFloat(display.textContent.replace(",", "."));
  // 2. save operator + update state
  state.operator = operator;
  state.waitingForSecondOperand = true;
  // 2. blink typed digit once
  // 3. get second operand
  // send query with params to calculator function when enter is pressed, return resuln
});

const digits = calcWrapper.querySelector(".digitsAndCommaWrapper");
const display = calcWrapper.querySelector(".display span");

digits.addEventListener("click", e => {
  const digit = e.target.querySelector("span").textContent;

  // if operator is clicked clear out display and start again
  if (state.operator && state.waitingForSecondOperand) {
    state.waitingForSecondOperand = false;
    return (display.textContent = digit);
  }

  // first digit 0 ? replace otherwise append
  if (display.textContent === "0") return (display.textContent = digit);

  display.textContent += digit;
});
