const max = process.argv[2];
let FizzBuzz = {
    [Symbol.iterator]() {
        let value, num = 0;

        return {
            next() {
                num++;
                switch (true) {
                    case (num % 15 === 0):
                        value = 'FizzBuzz';
                        break;
                    case (num % 3 === 0):
                        value = 'Fizz';
                        break;
                    case (num % 5 === 0):
                        value = 'Buzz';
                        break;
                    default:
                        value = num;
                }

                if (num < max) {

                    return {done: false, value: value};
                }

                return {done: true};
            }
        }
    }
};

for (let n of FizzBuzz) {
    console.log(n);
}