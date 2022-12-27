const { check } = require('express-validator');
let createUser = [
    check('data.email',"Invalid email").isEmail(),
    check('data.password',"Password must be at least 6 chars long").isLength({min:6})
    ];
    
    

module.exports = {createUser}