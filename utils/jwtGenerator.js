const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJwtToken = (user_id) => {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.jwtToken, { expiresIn: '1hr' });
}

module.exports = generateJwtToken;