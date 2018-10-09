function* factorial(n) {
    let factorial = 1;
    for (let i = 1; i <= n; i++) {

        yield factorial *= i;
    }
}

for (let n of factorial(5)) {
    console.log(n)
}
