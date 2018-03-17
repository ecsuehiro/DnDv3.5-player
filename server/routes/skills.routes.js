"use strict"

const router = require('express').Router()
const skillsControllersFactory = require('../controllers/skills.controller')

module.exports = apiPrefix => {
    const skillsController = skillsControllersFactory(apiPrefix)

    router.get('/', skillsController.read)
    router.get('/:id([0-9a-fA-F]{24})', skillsController.readById)
    router.post('/', skillsController.create)
    router.put('/:id([0-9a-fA-F]{24})', skillsController.update)
    router.delete('/:id([0-9a-fA-f]{24})', skillsController.deactivate)

    return router
}