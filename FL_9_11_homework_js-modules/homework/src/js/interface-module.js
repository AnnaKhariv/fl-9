import {add, subtract, multiply, divide} from './calculating-module';

export function render(root) {
    let keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/', 'C', '='];

    let calculator = document.createElement('div');

    let input = document.createElement('input');
    input.className = 'result';
    calculator.appendChild(input);

    let calculatorKeys = document.createElement('div');
    calculatorKeys.className = 'calculatorKeys';

    for (let i = 0; i < keys.length; i++) {
        let key = document.createElement('button');
        key.className = 'key';
        key.innerHTML = key.value = `${keys[i]}`;

        if (keys[i] !== 'C' && keys[i] !== '=') {

            key.addEventListener('click', (e) => {
                input.value += e.target.value;
            });
        }

        if (keys[i] === 'C') {
            key.addEventListener('click', () => {
                input.value = '';
            });
        }

        if (keys[i] === '=') {
            key.addEventListener('click', () => {
                calculate(input.value)
            });
        }

        calculatorKeys.appendChild(key);
    }
    calculator.appendChild(calculatorKeys);
    root.appendChild(calculator);

}

function calculate(operands) {
    let showResult = document.getElementsByClassName('result')[0];

    let numbers = operands.split(/[*/+-]/g);
    let signs = operands[1];

    showResult.value = result(+numbers[0],  +numbers[1], signs[0]);
}

function result(firstOperator, lastOperator, sign) {

    switch (sign) {
        case '+':
            return add(firstOperator, lastOperator);
        case '-':
            return subtract(firstOperator, lastOperator);
        case '/':
            return multiply(firstOperator, lastOperator);
        case '*':
            return divide(firstOperator, lastOperator);
        default:
            return 'Wrong calculation';
    }

}

