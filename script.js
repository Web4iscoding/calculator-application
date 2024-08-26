const display = document.querySelector(".upper");
const buttons = document.querySelectorAll(".button");
const container = document.querySelector(".container");
let equalPressed = false;
let value1 = "";
let value2 = "";
let operator = "";

for(const button of buttons) {
    button.addEventListener("click", (e) => {
        const clickedOnNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(e.target.textContent);
        const clickedOnOperater = ["/", "*", "-", "+", "%"].includes(e.target.textContent);

        if(e.target.textContent === "+/-"  && !["NaN", "0"].includes(display.textContent)) {
            if(value2 === "" && !(value1.includes("-"))) {
                const newValue = "-" + value1;
                value1 = newValue;
                display.textContent = newValue;
            }
            else if(value2 === "") {
                const newValue = value1.substring(1);
                value1 = newValue;
                display.textContent = newValue;
            }

            if(value1 !== "" && value2 !== "" && !(value2.includes("-"))) {
                const newValue = "-" + value2;
                value2 = newValue;
                display.textContent = newValue;
            }
            else if(value1 !== "" && value2 !== "") {
                const newValue = value2.substring(1);
                value2 = newValue;
                display.textContent = newValue;
            }
        }

        if(clickedOnNumber && operator.length === 0 && display.textContent !== "NaN") {
            value1 += e.target.textContent;
            display.textContent = value1;
            equalPressed = false;
        }
        else if(clickedOnNumber && display.textContent !== "NaN") {
            value2 += e.target.textContent;
            display.textContent = value2;
            equalPressed = false;
        }
        if(clickedOnOperater && value1.length !== 0 && value2.length === 0){
            operator = e.target.textContent
            equalPressed = false;
        }
        else if(clickedOnOperater && value1.length !== 0 && value2.length !== 0) {
            const result = operate(operator, Number(value1), Number(value2));
            value1 = String(result);
            value2 = "";
            display.textContent = result;
            equalPressed = false;
        }
        if(e.target.textContent === "=" && !equalPressed && (value1 !== "" && value2 !== "")) {
            const result = operate(operator, Number(value1), Number(value2));
            display.textContent = result;
            value1 = String(result);
            value2 = "";
            operator = "";
            equalPressed = true;
        }
        if(e.target.textContent === "AC") {
            value1 = "";
            value2 = "";
            operator = "";
            display.textContent = 0;
            equalPressed = false;
        }
        console.log("value1: ", value1);
        console.log("value2: ", value2);
    })
}

for(const button of buttons) {
    button.addEventListener("mouseover", (e) => {
        e.target.style.opacity = 0.8;
    })
}

for(const button of buttons) {
    button.addEventListener("mouseout", (e) => {
        e.target.style.opacity = 1;
    })
}

function add(x, y) {
    return x + y;
}

function substract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function modular(x, y) {
    return x % y;
}

function operate(operator, operand1, operand2) {
    switch(operator) {
        case "+":
            return add(operand1, operand2);
        case "-":
            return substract(operand1, operand2);  
        case "*":
            return multiply(operand1, operand2);
        case "/":
            return divide(operand1, operand2);
        case "%":
            return modular(operand1, operand2);
    }
}