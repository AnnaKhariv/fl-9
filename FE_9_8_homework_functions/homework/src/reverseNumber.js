function reverseNumber(number) {
    let sign = Math.sign(number);
    number = Math.abs(number).toString().split('').reverse().join('');
    return sign * number;
}