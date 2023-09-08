// this file is used to connect mongoDB with express server in "index.js" file.
const mongoose = require("mongoose")
// const mongoURI = "mongodb://localhost:27017/employees/intern"//connection string of mongoDB.

const connectToMongo = async () => {
    try {
        await mongoose.connect(('mongodb://127.0.0.1/test')
        )
            .then(console.log("connected to mongo succesfully")) // after succesfully connection with mongoDB.
    } catch (err) {
        console.log("the error is created : ", err) // if error haapend this will handle in error.
    }
}

module.exports = connectToMongo; // exporting connection function in other files.