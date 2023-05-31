const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'heyiammax';

// Create User Api
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const secPassword = bcrypt.hashSync(req.body.password, 10);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken })

    } catch (error) {
        console.log(error.message);
    }

})

//User Login Api

router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please Try to login with correct credentials." })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please Try to login with correct credentials." })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken })

    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;