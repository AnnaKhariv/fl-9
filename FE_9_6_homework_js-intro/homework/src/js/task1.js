let price = Number(prompt('Enter amount of money: ', '0'));
let discount = Number(prompt('Enter discount: ', '0'));
let result;

if(price < 0 || discount < 0 || discount > 100 || isNaN(price) || isNaN(discount)) {
    result = 'Invalid data';
} else {
    let saved = price * discount/100;
    let priceWihDiscount = price - saved;
    result = `
        Price without discount:  ${+price}\n 
        Discount:                ${+discount}%\n
        Price with discount:     ${+priceWihDiscount}\n
        Saved:                   ${+saved}`;
}

console.log(result);