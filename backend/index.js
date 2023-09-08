const express = require('express') // importing express in index.js.
var cors = require('cors')
const connectToMongo=require('./DB') //connection function is imported here from DB.js folder.
connectToMongo(); // running the connection function here 

const app = express()
app.use(cors())
const port = 5000
app.use(express.json()) // anable to send reqiuest in json format
//available  routes
app.use('/api/auth',require('./routes/auth'))  // importing route from auth.js
app.use('/api/notes',require('./routes/notes')) // importing route from notes


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})