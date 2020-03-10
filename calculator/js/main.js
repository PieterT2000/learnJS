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
const digits = calcButtons.querySelector(".digitsAndCommaWrapper");
const display = calcWrapper.querySelector(".display span");

operatorButtons.addEventListener("click", e => {
  const operator = e.target.dataset.action;
  const input = parseFloat(display.textContent.replace(",", "."));
  let result = input;

  function handleCalculation() {
    const currentOperand = input;
    result = calc[state.operator](state.firstOperand, currentOperand);
    const formattedResult = displayResult(result);
    // reset fontsize
    display.style.fontSize = "3rem";
    // display.style.opacity = 0;
    display.textContent = formattedResult;

    if (formattedResult.length > 8) {
      display.textContent = adjustFontSize(formattedResult);
      // display.style.opacity = 1;
    }
  }

  if (operator === "enter" && !state.waitingForSecondOperand) {
    handleCalculation();
    // unset operator after enter to make continuation of calculation possible
    return (state.operator = null);
  }

  // this accounts for multi-step calculations
  if (state.operator && !state.waitingForSecondOperand) {
    handleCalculation();
  }

  state.firstOperand = result;

  state.operator = operator;
  state.waitingForSecondOperand = true;
});

digits.addEventListener("click", e => {
  const input = display.textContent;
  const digit = e.target.querySelector("span").textContent;

  // if operator is clicked clear out display and start again
  if (state.operator && state.waitingForSecondOperand) {
    state.waitingForSecondOperand = false;
    return (display.textContent = digit);
  }

  // first digit 0 ? replace otherwise append
  if (input === "0") return (display.textContent = digit);

  // check textcontent length to adjust font-size appropiately
  if (input.length <= 7) return (display.textContent += digit);
  getFontSize();
  return (display.textContent += digit);
});

function displayResult(result) {
  const str = _toString(result);
  if (str.length <= 8) return str;

  //return rounded result
  return str.includes(",")
    ? _toString(result.toPrecision(7))
    : _toString(result.toPrecision(8));
}

const _toString = str => str.toString().replace(".", ",");

function getFontSize(str) {
  // check width
  const width = display.getBoundingClientRect().width;
  if (width > 220) {
    const fontSize = parseInt(getComputedStyle(display).fontSize, 10);
    display.style.fontSize = `${fontSize - 5}px`;
  }
}

function adjustFontSize(formattedResult) {
  const diff = formattedResult.length - 8;
  for (let i = 0; i <= diff; i++) {
    const width = display.getBoundingClientRect().width;
    if (width > 220) {
      const fontSize = parseInt(getComputedStyle(display).fontSize, 10);
      display.style.fontSize = `${fontSize - 5}px`;
    }
  }
  return formattedResult;
}

/* TODO:
- calculate display width as viewwidth percentage
- set fontsize to the viewwidth
- clean up code and covert to OOP
*/
