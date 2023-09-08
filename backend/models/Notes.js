const mongoose = require('mongoose')
const {Schema}= mongoose
//schema is a organized pattern of data
const NotesScheama = new Schema({  
    user:{
        type:mongoose.Schema.Types.ObjectId, //here we adding the user id as a foreign key  form User scheama
        ref:'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "genral"
    },
    date: {
        type: Date,
        default:Date.now()
    }


});
module.exports = mongoose.model('Notes',NotesScheama)