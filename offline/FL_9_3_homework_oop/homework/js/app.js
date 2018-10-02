function ShoppingCart(name, owner, maxCount) {
    this.name = name;
    this.owner = owner;
    this.maxCount = maxCount;

    let _shoppingList = [];
    let _logs = [`${this.name} was created in ${new Date()} by ${this.owner}`];

    this.checkIfOwns = function () {
        for (let i = 0; i < _shoppingList.length; i++) {
            if (_shoppingList[i].owner !== this.name) {
                this.removeProduct(i);
            }
        }
    };

    this.addNewProduct = function (product) {
        if (product instanceof Product) {
            this.checkIfOwns();

            if (_shoppingList.length === this.maxCount) {
                this.removeProduct(this.lowestPrice());
            }

            if (product.owner !== this.name) {
                product.removeProduct();
                product.add(this);
            }

            if (product.owner === this.name) {
                let _index = _shoppingList.findIndex(function (element) {
                    return element.name === product.name;
                });
                if (_index >= 0) {
                    this.removeProduct(_index);
                }
            }
            product.add(this);
            _shoppingList.push(product);
            _logs.push(`${product.name} was add to ${this.name} on ${product.dateOdAddingToCart}`);
        } else {
            console.log('Please try to add product instance');
            product.addHistoryLog(`Try to add incorrect data to ${this.name}`);
        }
        return this;
    };

    this.lowestPrice = function () {
        let _lowestPrice = Number.POSITIVE_INFINITY;
        let id;
        for (let i = 0; i < _shoppingList.length; i++) {
            if (_shoppingList[i].price < _lowestPrice) {
                _lowestPrice = _shoppingList[i].price;
                id = i;
            }
        }
        return id;
    };

    this.removeProduct = function (index) {
        _logs.push(`${_shoppingList[index].name} was removed from ${this.name} on ${new Date()}`);
        _shoppingList.splice(index, 1);
        return this;
    };

    this.getTotalPrice = function () {
        let _totalPrice = 0;
        for (let i = 0; i < _shoppingList.length; i++) {
            _totalPrice += _shoppingList[i].price;
        }
        return _totalPrice;
    };

    this.getAvaragePrice = function () {
        return (this.getTotalPrice() / _shoppingList.length).toFixed(2);
    };

    this.getProducts = function () {
        this.checkIfOwns();
        return _shoppingList;
    };

    this.getHistory = function () {
        return _logs;
    };

    this.getFormattedListOfProducts = function () {
        let formattedList = [];

        for (let i = 0; i < _shoppingList.length; i++) {
            formattedList.push(
                `${_shoppingList[i].name} - is on ${name} from ${_shoppingList[i].dateOdAddingToCart}. 
                Detailed product description: ${JSON.stringify(_shoppingList[i].description)}`);
        }

        return formattedList;
    };

}

function Product(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.owner = '';
    this.dateOdAddingToCart = '';

    let _logs = [`${this.name} was created in ${new Date()}`];

    this.getPrice = function () {
        return this.price;
    };

    this.setPrice = function (newPrice) {
        if (isFinite(newPrice) && !isNaN(newPrice) && newPrice > this.price) {
            _logs.push(`Change price from ${this.price} to ${newPrice}`);
            this.price = newPrice;
        } else {
            _logs.push(`Try to change price from ${this.price} to ${newPrice}`);
        }
        return this;
    };

    this.add = function (owner) {
        if (owner instanceof ShoppingCart) {
            this.owner = owner.name;
            this.dateOdAddingToCart = new Date();
            _logs.push(`${this.name} is on ${this.owner} from ${this.dateOdAddingToCart}`);
            return this;
        }
    };

    this.removeProduct = function () {
        this.owner = '';
        this.dateOdAddingToCart = '';
        return this;
    };

    this.getHistoryLog = function () {
        return _logs;
    };

    this.addHistoryLog = function (log) {
        _logs.push(log);
    };
}


/*Demonstration*/
const banana = new Product('banana', {color: 'yellow', size: 'medium'}, 45);

console.log(banana.getPrice());
console.log(banana
    .setPrice(-100)
    .setPrice('text')
    .setPrice(30)
    .setPrice(50));
console.table(banana.getHistoryLog());

const apple = new Product('apple', {color: 'red', size: 'small'}, 30);
const avocado = new Product('avocado', {color: 'green', size: 'small'}, 15);

const stevesShopCart = new ShoppingCart('stevesCart', 'Steve', 5);
const annasShopCart = new ShoppingCart('annasCart', 'Anna', 2);

stevesShopCart
    .addNewProduct(banana)
    .addNewProduct(banana)
    .addNewProduct(banana);
console.table(stevesShopCart.getHistory());

annasShopCart.addNewProduct(banana);
console.table(stevesShopCart.getProducts());

annasShopCart
    .addNewProduct(avocado)
    .addNewProduct(apple)
    .removeProduct(0);
console.table(annasShopCart.getHistory());

stevesShopCart
    .addNewProduct(banana)
    .addNewProduct(apple)
    .addNewProduct(avocado);

console.log('average price:', stevesShopCart.getAvaragePrice());
console.log('total price:', stevesShopCart.getTotalPrice());

console.table(stevesShopCart.getFormattedListOfProducts());
console.table(annasShopCart.getFormattedListOfProducts());