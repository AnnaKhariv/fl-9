let price = Number(prompt('Enter amount of money: ', '0'));
let discount = Number(prompt('Enter discount: ', '0'));
let result;

if (price < 0 || discount < 0 || discount > 100 || isNaN(price) || isNaN(discount)) {
    result = 'Invalid data';
} else {
    let saved = price * discount / 100;
    let priceWihDiscount = price - saved;
    result = `
        Price without discount:  ${+price.toFixed(2)}\n 
        Discount:                ${+discount.toFixed(2)}%\n
        Price with discount:     ${+priceWihDiscount.toFixed(2)}\n
        Saved:                   ${+saved.toFixed(2)}`;
}

console.log(result);