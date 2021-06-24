const express = require('express');
const bcrypt = require('bcrypt');

const db = require('../db.js');
const generateJwtToken = require('../utils/jwtGenerator.js');

const router = express.Router();

router.post('/register', async(req, res) => {
    try{
        // 1. destructor the data
        const { user_name, user_email, user_password } = req.body;

        // 2. Check to see if user already exists
        const user = await db.query("SELECT * FROM users WHERE user_email=$1;", [user_email])

        if (user.rows.length !== 0) {
            return res.status(401).json({ message: "That user already exists" })
        }
        // 3. Bcrypt the password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const genPassword = await bcrypt.hash(user_password, salt);

        // 4. Save the user to the db
        const newUser = await db.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *;", [user_name, user_email, genPassword]);

        // 5. Generate jwt token for the user passing in the user id
        const token = generateJwtToken(newUser.rows[0].user_id);
        
        res.json({token: token})
    }catch(err) {
        console.error(err.message)
        res.status(401).json({ message: err.message })
    }
})


module.exports = router;