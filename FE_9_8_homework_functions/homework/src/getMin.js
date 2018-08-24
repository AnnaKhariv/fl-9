function getMin() {
    let min = Number.POSITIVE_INFINITY;

    for (let i = 0; i < arguments.length; i++) {

        if (arguments[i] < min) {
            min = arguments[i];
        }
    }
    return min;
}

