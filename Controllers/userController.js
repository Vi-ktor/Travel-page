const User = require('../models/user');

// Express Validator
const {check, validationResult} = require('express-validator/check');
const {sanitize} = require('express-validator/filter');

exports.signUpGet = (req, res) => {
    res.render('sign_up', { title: 'User sign up'});
}

exports.signUpPost = [
    //Validate the users data and clean up input, thats why I used array here and included the express-validator package 
    check('first_name').isLength({min:1}).withMessage('First name must be specified')
    .isAlphanumeric().withMessage('First must be alphanumeric'),

    check('surname').isLength({min:1}).withMessage('Surname name must be specified')
    .isAlphanumeric().withMessage('Surname must be alphanumeric'),

    check('email').isEmail().withMessage('Invalid email address'),

    check('confirm_email')
    .custom((value,{req}) => value === req.body.email)
    .withMessage('Email addresses do not match'),

    check('password').isLength({min:6})
    .withMessage('Password must be minimum of 6 characters'),

    check('confirm_password')
    .custom((value,{req}) => value === req.body.password)
    .withMessage('Passwords do not match'),

    sanitize('*').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {  //used to check if there are any errors cos of the ! addeed. Doing the opposite of what this function is meant to do
            //There are errors
           res.render('sign_up', {title: 'Please fix the following errors:', errors: errors.array()});
           return;
        } else {
            //No errors
            const newUser = new User(req.body);
            User.register(newUser, req.body.password, function(err) {
                if(err) {
                    console.log('error while registering!', err);
                    return next(err);
                }
            });
        }
    }
];