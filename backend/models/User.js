const mongoose = require('mongoose');
const {Schema}= mongoose
//schema is a organized pattern of data
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('User',UserSchema);

