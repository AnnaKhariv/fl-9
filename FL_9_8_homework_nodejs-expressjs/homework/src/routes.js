const express = require('express');
const router = express.Router();

const car = require('./handlers/car');

router.post('/car', car.create);
router.get('/car', car.list);
router.get('/car/:id', car.find);
router.put('/car/:id', car.update);
router.delete('/car/:id', car.remove);


module.exports = router;