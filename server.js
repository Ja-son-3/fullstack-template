const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 8000

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'sample_mflix', //dbname
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to the database`)
        db = client.db(dbName)
        collection = db.collection('movies') //collection name
    })

app.set('view engine', 'ejs') //Template for html utilizing JS
app.use(express.static('public')) //Connects main.js and style.css 
app.use(express.urlencoded({extended:true})) //returns middleware that only parses urlencoded bodies and onyl looks at requests where the Content-Type header matches the type option
app.use(express.json()) //helps express parse/read json data
app.use(cors()) 

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})