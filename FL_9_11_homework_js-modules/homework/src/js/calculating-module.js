export function add(firstOperator, lastOperator) {

    return firstOperator + lastOperator;
}

export function subtract(firstOperator, lastOperator) {

    return firstOperator - lastOperator;
}

export function multiply(firstOperator, lastOperator) {

    return firstOperator * lastOperator;
}

export function divide(firstOperator, lastOperator) {
    if (lastOperator === 0){
        return 'Wrong calculation';
    }

    return firstOperator / lastOperator;
}