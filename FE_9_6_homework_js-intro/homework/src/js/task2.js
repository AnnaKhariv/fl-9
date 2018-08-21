let sideA = Number(prompt('Enter side A length: ', '0'));
let sideB = Number(prompt('Enter side B length: ', '0'));
let angle = Number(prompt('Enter angle between sides: ', '0'));
let result;

if (isValid(sideA) || isValid(sideB) || isValid(angle)) {
    result = 'Invalid data';
} else {
    const DEGREE = 180;
    let angleRadian = angle * Math.PI / DEGREE;

    let sideC = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2) - 2 * sideA * sideB * Math.cos(angleRadian));
    let triangleSquare = 1 / 2 * sideA * sideB * Math.sin(angleRadian);
    let trianglePerimeter = sideA + sideB + sideC;

    result = `
        С length:           ${+sideC.toFixed(2)}\n
        Triangle square:    ${+triangleSquare.toFixed(2)}\n              
        Triangle perimeter: ${+trianglePerimeter.toFixed(2)}`;
}

function isValid(value) {
    return isNaN(value) || value.toFixed(2) <= 0;
}

console.log(result);