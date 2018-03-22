"use strict"

const weaponsService = require('../services/weapons.service')

let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        read:_read,
        readWeaponIds: _readWeaponIds,
        readById: _readById,
        create: _create,
        update: _update,
        deactivate: _deactivate
    }
}

function _read(req, res) {
    weaponsService.read()
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.warn(err)
        res.status(500).send(err)
    })
}

function _readWeaponIds(req, res){
    weaponsService.readWeaponIds()
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.warn(err)
        res.status(500).send(err)
    })
}

function _readById(req, res) {
    weaponsService.readById(req.params.id)
        .then(weapon => {
            res.json(weapon)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _create(req, res) {
    weaponsService.create(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _update(req, res) {
    weaponsService.update(req.params.id, req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _deactivate(req, res) {
    weaponsService.delete(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}