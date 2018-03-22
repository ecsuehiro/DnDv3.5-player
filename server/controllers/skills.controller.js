"use strict"

const skillsService = require('../services/skills.service')

let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        read:_read,
        readSkillIds: _readSkillIds,
        readById: _readById,
        create: _create,
        update: _update,
        deactivate: _deactivate
    }
}

function _read(req, res) {
    skillsService.read()
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.warn(err)
        res.status(500).send(err)
    })
}

function _readSkillIds(req, res) {
    skillsService.readSkillIds()
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.warn(err)
        res.status(500).send(err)
    })
}

function _readById(req, res) {
    skillsService.readById(req.params.id)
        .then(skill => {
            res.json(skill)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _create(req, res) {
    skillsService.create(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _update(req, res) {
    skillsService.update(req.params.id, req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _deactivate(req, res) {
    skillsService.delete(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}