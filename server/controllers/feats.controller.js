"use strict"

const featsService = require('../services/feats.service')

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
    featsService.read()
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.warn(err)
        res.status(500).send(err)
    })
}

function _readById(req, res) {
    featsService.readById(req.params.id)
        .then(feat => {
            res.json(feat)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _create(req, res) {
    featsService.create(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _update(req, res) {
    featsService.update(req.params.id, req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _deactivate(req, res) {
    featsService.delete(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}