"use strict"

const monstersService = require('../services/monsters.service')

let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        read:_read,
        readById: _readById,
        create: _create,
        update: _update,
        deactivate: _deactivate
    }
}

function _read(req, res) {
    monstersService.read()
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.warn(err)
        res.status(500).send(err)
    })
}

function _readById(req, res) {
    monstersService.readById(req.params.id)
        .then(player => {
            res.json(player)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _create(req, res) {
    monstersService.create(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _update(req, res) {
    monstersService.update(req.params.id, req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _deactivate(req, res) {
    monstersService.delete(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}