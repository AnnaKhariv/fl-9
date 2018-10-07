//1
function assign(target) {
    if (typeof target !== 'object' || arguments.length < 2) {
        console.error('Incorrect input data!');
    } else {
        for (let i = 1; i < arguments.length; i++) {
            let args = arguments[i];

            if (args !== null || args !== undefined) {
                for (let key in args) {
                    if (Object.prototype.hasOwnProperty.call(args, key)) {
                        target[key] = args[key];
                    }
                }
            }
        }

        return target;
    }
}

//2
function Bot(config) {
    this.name = config.name;
    this.defaultSpeed = config.speed;
    this.speed = this.defaultSpeed;
    this.x = config.x;
    this.y = config.y;
    this.position = {
        x: this.x,
        y: this.y
    };
}


Bot.prototype.setSpeed = function (speed) {
    if (isFinite(speed) && !isNaN(speed)) {
        this.speed = speed;
    } else {
        console.log('Incorrect input speed data!')
    }

    return this;
};

Bot.prototype.getSpeed = function () {

    return this.speed;
};

Bot.prototype.getDefaultSpeed = function () {

    return this.defaultSpeed;
};

Bot.prototype.setCoordinates = function (x, y) {
    if (typeof arguments[0] === 'object') {
        this.x = arguments[0].x;
        this.y = arguments[0].y;
    } else {
        this.x = x;
        this.y = y;
    }

    return this;
};

Bot.prototype.getCoordinates = function () {
    this.position.x = this.x;
    this.position.y = this.y;

    return this.position;
};

Bot.prototype.move = function (direction) {
    switch (direction) {
        case 'up':
            this.y += this.speed;
            break;
        case 'down':
            this.y -= this.speed;
            break;
        case 'left':
            this.x -= this.speed;
            break;
        case 'right':
            this.x += this.speed;
            break;
        default:
            console.log('Direction is specified badly, repeat action!');
    }

    return this;
};

Bot.prototype.showPosition = function () {
    console.log(`I am ${this.constructor.name} '${this.name}'. I am located at ${this.x}:${this.y}.`);
};

function Racebot(config) {
    Bot.call(this, config);
    this.previousDirection = '';
}

Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Bot;

Racebot.prototype.move = function (direction) {
    if (direction === this.previousDirection) {
        this.speed += 1;
    } else {
        this.speed = this.defaultSpeed;
    }
    this.previousDirection = direction;

    return Bot.prototype.move.call(this, direction);
};

function Speedbot(config) {
    Bot.call(this, config);
}

Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Bot;

Speedbot.prototype.prepareEngine = function () {
    this.speed += 2;
};

Speedbot.prototype.move = function (direction) {
    Bot.prototype.move.call(this, direction);

    if (this.speed !== this.defaultSpeed) {
        this.speed--;
    }

    return this;
};

//Task 1
let defaults = {a: 123, b: 777};
let options = {a: 456};
let configs = assign({}, defaults, options); // {a: 456, b: 777}
console.log(configs);

//Task 2
let Botty = new Bot({name: 'Betty', speed: 2, x: 0, y: 1});
Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:1.
Botty.move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:3.
Botty.move('left').move('down').move('up').move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:5.
Botty.move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:7.
Botty.move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:9.

let Zoom = new Racebot({name: 'Lightning', speed: 2, x: 0, y: 1});
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:1.

Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:3.
Zoom.move('left').move('down').move('up');
Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:6.
Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:10.
Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:15.

let Broom = new Speedbot({name: 'Thunder', speed: 2, x: 0, y: 1});
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:1.
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:3.
Broom.prepareEngine();
Broom.move('left');
Broom.move('down');
Broom.move('up');
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:4.
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:6.
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:8.

