"use strict"

const router = require('express').Router()
const weaponsControllersFactory = require('../controllers/weapons.controller')

module.exports = apiPrefix => {
    const weaponsController = weaponsControllersFactory(apiPrefix)

    router.get('/', weaponsController.read)
    router.get('/:id([0-9a-fA-F]{24})', weaponsController.readById)
    router.post('/', weaponsController.create)
    router.put('/:id([0-9a-fA-F]{24})', weaponsController.update)
    router.delete('/:id([0-9a-fA-f]{24})', weaponsController.deactivate)

    return router
}