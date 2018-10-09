let inputs = process.argv.slice(2);
let result = inputs.map(item => item[0].toUpperCase())
    .reduce((res, currentValue) => res + currentValue);
console.log(result);
