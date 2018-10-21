const authorizationCheck = (req, res, next) => {

    if (req.method === 'DELETE' && req.headers.authorization !== 'Basic Og==') {

        return res.status(401).send('Unauthorized');
    } else {
        next();
    }

};

module.exports = authorizationCheck;

//X-Password qwerty