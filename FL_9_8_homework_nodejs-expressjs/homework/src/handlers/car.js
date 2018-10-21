const fs = require('fs');
const db = 'db/data.json';

let readData = new Promise((resolve, reject) => {
    fs.readFile(db, (err, res) => {
        if (err) {
            reject(err);
        } else {
            resolve(JSON.parse(res));
        }
    });
});


let writeData = (data) => {
    let updatedData = JSON.stringify(data);

    fs.writeFile(db, updatedData, (err) => {
        if (err) {

            return console.log(err.message);
        }
    });

};

const list = (req, res) => {
    fs.readFile(db, (err, result) => {
        if (err) {

            return console.log(err.message);
        } else {
            res.status(200).send(result);
        }
    });
};

const create = (req, res) => {

    fs.readFile(db, (err, result) => {
        if (err) {

            return console.log(err.message);
        } else {
            let data = JSON.parse(result);

            const reqCar = {
                id: req.body.id,
                brand: req.body.brand,
                model: req.body.model,
                engineVolume: req.body.engineVolume,
                year: req.body.year
            };

            if (data.find(car => car.id === reqCar.id)) {

                return res.status(409).send({"message": "Car already exists."});
            }

            data.push(reqCar);
            writeData(data);

            res.status(201).send(reqCar);
        }
    });

};


const find = (req, res) => {
    readData
        .then(data => {
            let car = data.find(car => car.id === parseInt(req.params.id));

            if (!car) {

                return res.status(404).send('The car with the given ID was not found.');
            }

            res.status(200).send(car);
        });
};

const update = (req, res) => {
    readData
        .then(data => {
            let car = data.find(car => car.id === parseInt(req.params.id));
            if (!car) {

                return res.status(404).send('The car with the given ID was not found.');
            }

            const reqCar = {
                id: req.body.id,
                brand: req.body.brand,
                model: req.body.model,
                engineVolume: req.body.engineVolume,
                year: req.body.year
            };

            car = reqCar;
            writeData(data);
            res.status(200).send(car);
        });
};

const remove = (req, res) => {

    fs.readFile(db, (err, result) => {
        if (err) {

            return console.log(err.message);
        } else {
            let data = JSON.parse(result);

            let car = data.find(car => car.id === parseInt(req.params.id));
            if (car) {
                data.splice(data.indexOf(car), 1);
                writeData(data);
                return res.status(200).send({"message": "The car has been successfully removed"});
            } else {
                return res.status(404);
            }
        }
    });






};


module.exports = {
    create,
    list,
    find,
    update,
    remove
};
