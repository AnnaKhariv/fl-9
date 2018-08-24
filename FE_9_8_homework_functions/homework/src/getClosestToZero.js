function getClosestToZero() {
    let closest = Number.POSITIVE_INFINITY;

    for (let i = 0; i < arguments.length; i++) {
        let sign = Math.sign(arguments[i]);

        arguments[i] = Math.abs(arguments[i]);
        if (arguments[i] < closest) {
            closest = arguments[i] * sign;
        }
    }
    return closest;
}