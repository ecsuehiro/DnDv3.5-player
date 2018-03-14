// NOTE: Have to add new routes in here (This is where we export ALL the route's and backend functions)

"use strict"

const express = require('express')
const router = express.Router()

const playersApiPrefix = '/api/players'
const playersRoutes = require('./players.routes')(playersApiPrefix)

// Misc require
const authenticate = require("../filters/authenticate")
const path = require("path")
const contentPath = path.join(__dirname, "../../content")

module.exports = router
router.use(express.static(contentPath))

// check authentication for all requests
router.use(authenticate)

router.use(playersApiPrefix, playersRoutes)

// API error handlers (API routes must be registered before this)
useAPIErrorHandlers(router)

function useAPIErrorHandlers(router) {
    // Handle API 404
    router.use("/api/*", (req, res, next) => {
        res.sendStatus(404)
    })

    // Handle API 500
    router.use((err, req, res, next) => {
        if (!err) {
            return next()
        }

        // Log it
        console.log(err.stack)

        // Redirect to error page
        res.sendStatus(500)
    })
}
