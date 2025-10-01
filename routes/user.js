const express = require('express');
const {signUp, login} =require('../controllers/users');
const {body, validationResult}= require('express-validator')


const router = express.Router();


router.use(express.json());

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
//User Routes

router.post('/signup',[
    body('user_name').isLength({min: 5}),
    body('password').isLength({min: 10}),
    body('user_email').isEmail(),
    handleValidationErrors
],signUp);


router.post('/login',[
    body('user_name').isLength({min: 5}),
    body('password').isLength({min: 10}),
    handleValidationErrors
],login);

module.exports=router;