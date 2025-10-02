const express = require('express');
const {createLink,getFile} =require('../controllers/links');
const isAuth = require('../Middleware/authentication');
const router = express.Router();

router.post('/createLink',[isAuth],(request,response) => createLink(request, response));
router.get('/getFile/:id',[isAuth],(request,response) => getFile(request, response));

module.exports = router;