let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let cors = require('cors')
let app = express()
let port = 3003
let url = 'mongodb://tartarus:ramirez160796@localhost/DB'
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Importe Routes
let movieRoute = require('../routes/Movie.js')
app.use("/", movieRoute);


//Connection to the DB
let db = mongoose.connection
mongoose.connect(
    url,
    { useUnifiedTopology: true , useNewUrlParser: true }, 
    () => {
        console.log("Connected to the DB: "+url) 
    }
);

app.listen(port, () => {
    console.log("[RESTAPI activated] \nPort:"+port)
})