"use strict"

const router = require('express').Router()
const optionsControllersFactory = require('../controllers/options.controller')

module.exports = apiPrefix => {
    let optionsController = optionsControllersFactory(apiPrefix)

    router.get('/', optionsController.readAllOptions)

    return router
}