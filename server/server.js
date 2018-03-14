'use strict'

const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongo = require('./mongodb')
const mainRouter = require('./routes') //index.js by default
// const configMongoDB = require('./config/mongodb.config')
const cookieParser = require('cookie-parser')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// enable cookie-parser
app.use(cookieParser())

// initialize dotenv
dotenv.config()

// set our port
const port = process.env.PORT || 8080

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// register routes
app.use(mainRouter)

// start mongo connection pool, then start express app
mongo.connect(process.env.MONGODB_URL)
    // .then(() => configMongoDB(app))
    .then(() => app.listen(port))
    .then(() => console.log(`Magic happens on port: ${port}`))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })