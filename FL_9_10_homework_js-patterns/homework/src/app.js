class Store {
    constructor(price, discountWeekend, discountNight, bonusValue) {
        this.price = price;
        this.discountWeekend = discountWeekend;
        this.discountNight = discountNight;
        this.bonusValue = bonusValue;
    }

    pizzaSlicePrice() {

        return this.price;
    }

    weekendDiscount() {

        return this.discountWeekend;
    }

    nightDiscount() {

        return this.discountNight;
    }

    bonus() {

        return this.bonusValue;
    }

    buyPizzaSlice() {
        console.log(`Price after discount is ${this.cost()} and you have ${this.bonus()} bonuses`);
    }

    cost() {
        return this.price - this.discountNight - this.discountWeekend;
    }
}

function getDiscount(store) {
    let currentDate = new Date();
    let _currentPrice = store.pizzaSlicePrice();

    if (currentDate.getHours() === 23 || currentDate.getHours() < 6) {
        _currentPrice -= store.nightDiscount();
    }

    if (currentDate.getDate() === 0 || currentDate.getDate() === 6) {
        _currentPrice -= store.weekendDiscount();
    }

    store.cost = () => _currentPrice;
}

function setBonus(store) {
    let price = store.cost();
    let bonusValue = store.bonus();

    store.bonus = () => bonusValue + Math.floor(price / 10);
}

let store = new Store(100, 5, 15, 0);

getDiscount(store);
setBonus(store);

store.buyPizzaSlice();
