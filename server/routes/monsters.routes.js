"use strict"

const router = require('express').Router()
const monstersControllersFactory = require('../controllers/monsters.controller')

module.exports = apiPrefix => {
    const monstersController = monstersControllersFactory(apiPrefix)

    router.get('/', monstersController.read)
    router.get('/:id([0-9a-fA-F]{24})', monstersController.readById)
    router.post('/', monstersController.create)
    router.put('/:id([0-9a-fA-F]{24})', monstersController.update)
    router.delete('/:id([0-9a-fA-f]{24})', monstersController.deactivate)

    return router
}