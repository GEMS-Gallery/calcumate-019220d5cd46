import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let currentInput = '';
let currentOperator = '';
let firstOperand = null;

document.querySelectorAll('.number, .decimal').forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '.' && currentInput.includes('.')) return;
        currentInput += button.textContent;
        display.value = currentInput;
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput !== '') {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else {
                calculateResult();
            }
            currentOperator = button.textContent;
            currentInput = '';
        }
    });
});

document.querySelector('.equals').addEventListener('click', calculateResult);

document.querySelector('.clear').addEventListener('click', () => {
    currentInput = '';
    currentOperator = '';
    firstOperand = null;
    display.value = '';
});

async function calculateResult() {
    if (firstOperand !== null && currentInput !== '') {
        const secondOperand = parseFloat(currentInput);
        let result;

        try {
            switch (currentOperator) {
                case '+':
                    result = await backend.add(firstOperand, secondOperand);
                    break;
                case '-':
                    result = await backend.subtract(firstOperand, secondOperand);
                    break;
                case '*':
                    result = await backend.multiply(firstOperand, secondOperand);
                    break;
                case '/':
                    const divisionResult = await backend.divide(firstOperand, secondOperand);
                    if (divisionResult === null) {
                        throw new Error('Division by zero');
                    }
                    result = divisionResult;
                    break;
            }

            display.value = result;
            firstOperand = result;
            currentInput = '';
        } catch (error) {
            display.value = 'Error';
            firstOperand = null;
            currentInput = '';
        }
    }
}
