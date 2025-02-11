const express = require('express');
const router = express.Router();

//pg-promise
const pgp = require('pg-promise')();
const connesctionString = "postgress://localhost:5432/facebook_db";
const db = pgp(connesctionString);

router.get('/:user_id', async (req, res) => {
    let user_id = Number(req.params.user_id)
    let posts = await db.any('SELECT * FROM posts WHERE poster_id = $1', [user_id])
    try {
        res.json({
            payload: posts, 
            message: "Success you've reached /posts"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})

router.get('/', async (req, res) => {
    let posts = await db.any('SELECT * FROM posts')
    
    try {
        res.json({
            payload: posts, 
            message: "Success you've reached /posts"
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
        `INSERT INTO posts(poster_id, body)
            VALUES($1, $2)`

    try {
        await db.none(insertQuery, [req.body.poster_id, req.body.body])
        res.json({
            payload: req.body, 
            message: 'POST request arrivesd at posts/register',
        })
    } catch(error) {
        res.json({
            message: 'There was an error registering post.',
        })
    }
})

module.exports = router;