const express = require('express');
const router = express.Router();

//pg-promise
const pgp = require('pg-promise')();
const connesctionString = "postgress://localhost:5432/facebook_db";
const db = pgp(connesctionString);

router.get('/', async (req, res) => {
    let users = await db.any('SELECT * FROM users')

    try {
        res.json({
            payload: users, 
            message: "Success you've reached /users"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})

router.post('/register', async (req, res) => {
    let insertQuery = 
        `INSERT INTO users(firstname, lastname, age)
            VALUES($1, $2, $3)`

    try {
        await db.none(insertQuery, [req.body.firstname, req.body.lastname, req.body.age])
        res.json({
            payload: req.body, 
            message: 'POST request arrivesd at users/register',
        })
    } catch(error) {
        res.json({
            message: 'There was an error registering user.',
        })
    }
})

module.exports = router;