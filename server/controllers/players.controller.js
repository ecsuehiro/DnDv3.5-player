"use strict"

const playersService = require('../services/players.service')

let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        read: _read,
        readById: _readById,
        create: _create,
        update: _update,
        delete: _delete
    }
}

function _read(req, res) {
    playersService.read()
        .then(players => {
            res.json(players)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _readById(req, res) {
    playersService.readPlayerWithOptions(req.params.id)
        .then(player => {
            res.json(player)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _create(req, res) {
    playersService.create(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _update(req, res) {
    playersService.update(req.params.id, req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _delete(req, res) {
    playersService.delete(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}