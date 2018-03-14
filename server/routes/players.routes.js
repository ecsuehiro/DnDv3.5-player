"use strict"

const router = require('express').Router()
const validate = require('../filters/validate.body')

const playersControllersFactory = require('../controllers/players.controller')

module.exports = apiPrefix => {
    const playersController = playersControllersFactory(apiPrefix)

    router.get('/', playersController.read)
    router.get('/:id([0-9a-fA-F]{24})', playersController.readById)
    router.post('/', playersController.create)
    router.put('/:id([0-9a-fA-F]{24})', playersController.update)
    router.delete('/:id([0-9a-fA-f]{24})', playersController.delete)

    return router
}