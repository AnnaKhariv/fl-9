//1
function findType(parameter) {
    return typeof parameter;
}

//2
function forEach(arr, incomingFunction) {
    for (let i = 0; i < arr.length; i++) {
        incomingFunction(arr[i]);
    }
}

//3
function map(arr, incomingFunction) {
    let transformedArray = [];

    forEach(arr, function (item) {
        transformedArray.push(incomingFunction(item));
    });

    return transformedArray;
}

//4
function filter(arr, incomingFunction) {
    let filteredArray = [];

    forEach(arr, function (item) {
        if (incomingFunction(item)) {
            filteredArray.push(item);
        }
    });

    return filteredArray;
}

//5
function getAdultAppleLovers(data) {

    let filteredData = filter(data, function (item) {
        return item['age'] > 18;
    });

    let result = [];
    forEach(filteredData, function (item) {
        if (item['favoriteFruit'] === 'apple') {
            result.push(item['name']);
        }
    });

    return result;
}

//6
function keys(obj) {
    let keys = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    return keys;
}

//7
function values(obj) {
    let values = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            values.push(obj[key]);
        }

    }

    return values;
}

//8
function showFormattedDate(date) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `It is ${date.getDate()} of ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

