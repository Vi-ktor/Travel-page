const mongoose = require('mongoose');

// This schema takes in objects, constructing how the hotel will look is done here by putting in the values
const hotelSchema = new mongoose.Schema({
    hotel_name: {
        type: String,
        required: 'Hotel name is required', //Message added in case a field is missing
        max: 32, //maxinum number of characters in the field
        trim: true // removes any white spaces from the field leaving only the characters entered
    },
    hotel_description: {
        type: String,
        required: 'Hotel description is required',
        trim: true
    },
    image: String,
    star_rating:{
        type: Number,
        required: 'Hotel star rating is required',
        max:5
    },
    country: {
        type: String,
        required: 'Country is required',
        trim: true
    },
    cost_per_night:{
        type: Number,
        required: 'Cost per night is required'
    },
    available:{
        type: Boolean,
        required:'Availability is required'
    }
});

hotelSchema.index({
    hotel_name: 'text',
    country: 'text'
})

//Export a model
module.exports = mongoose.model('Hotel', hotelSchema);