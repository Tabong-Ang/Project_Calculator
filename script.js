"use strict";

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        return "ERROR";
    }
    return a / b;
};

let num1 = {
    value: "",
    dot: false
};
let num2 = {
    value: "",
    dot: false
};

let operator = "";
let current = num1;

const operate = (num1, operator, num2) => {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "INVALID OPERATOR";
    }
};

const numberClick = () => {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            numValue(e.target.textContent);
        });
    });
};

const displayValue = (value) => {
    const display = document.querySelector("#display");
    if (value !== undefined) {
        display.textContent = value;
    } else {
        display.textContent = `${num1.value} ${operator} ${num2.value}`;
    }
};

const operatorClick = () => {
    const operators = document.querySelectorAll(".operator");
    operators.forEach(op => {
        op.addEventListener("click", (e) => {
            operatorValue(e.target.textContent);
        });
    });
};

const numValue = (value) => {
    if (value === ".") {
        if (current.dot) return;
        current.dot = true;
    }
    current.value += value;
    displayValue();
};

const operatorValue = (oper) => {
    if (num1.value === "") return;
    if (num2.value) {
        solve();
    }
    operator = oper;
    if (current === num1) {
        current = num2;
    }
    displayValue();
};

const equalsOperator = () => {
    const equals = document.querySelector(".equal");
    equals.addEventListener("click", solve);
};

const solve = () => {
    if (num1.value === "" || num2.value === "" || operator === "") return;
    const num1Value = Number(num1.value);
    const num2Value = Number(num2.value);
    const result = operate(num1Value, operator, num2Value);
    clear();
    if (typeof result === "string") {
        displayValue(result);
    } else {
        const fixedResult = Math.round(result * 1000) / 1000;
        num1.value = fixedResult;
        displayValue(num1.value);
    }
};

const clearButton = () => {
    const clearKey = document.querySelector(".clear");
    clearKey.addEventListener("click", () => {
        clear();
        displayValue();
    });
};

const backspaceButton = () => {
    const backspace = document.querySelector(".backspace");
    backspace.addEventListener("click", () => {
        current.value = current.value.slice(0, -1);
        if (current.value === "") current.dot = false;
        displayValue();
    });
};

const clear = () => {
    clearOperand(num1);
    clearOperand(num2);
    current = num1;
    operator = "";
};

function clearOperand(operand) {
    operand.value = "";
    operand.dot = false;
}

const keyboardSupport = () => {
    numberClick();
    operatorClick();
    equalsOperator();
    clearButton();
    backspaceButton();
};

keyboardSupport();
