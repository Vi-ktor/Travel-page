const mongoose = require ('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'First name is required',// appeaes if nothing is typed in
        trim: true,
        max: 30
    },
    surname: {
       type: String,
       required: 'Surname is required',
       trim: true, //remove white spaces
       max: 30 // maximum characters  
    },

    email: {
        type: String,
        required: 'Email address is required',
        trim: true,
        unique: true, //this ensures that the same email address doesn't appear twice in the database
        lowercase: true //email will be in lowercase
    },

    password: {
        type: String,
        required: 'Password is required'
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);