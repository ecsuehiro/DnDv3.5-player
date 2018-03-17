"use strict"

const router = require('express').Router()
const featsControllersFactory = require('../controllers/skills.controller')

module.exports = apiPrefix => {
    const featsController = featsControllersFactory(apiPrefix)

    router.get('/', featsController.read)
    router.get('/:id([0-9a-fA-F]{24})', featsController.readById)
    router.post('/', featsController.create)
    router.put('/:id([0-9a-fA-F]{24})', featsController.update)
    router.delete('/:id([0-9a-fA-f]{24})', featsController.deactivate)

    return router
}