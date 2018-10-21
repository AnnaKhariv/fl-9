const express = require('express');
const bodyParser = require('body-parser').json();

const app = express();
const port = 3000;

const router = require('./routes');
const authorization = require('./middlewares/delete-authorization');

app.use(bodyParser);
app.use(authorization);
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});