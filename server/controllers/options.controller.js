"use strict"

const weaponsService = require('../services/weapons.service')
const skillsService = require('../services/skills.service')
const featsService = require('../services/feats.service')

let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        readAllOptions: _readAllOptions
    }
}

function _readAllOptions(req, res) {
    Promise.all([
        weaponsService.readWeaponIds(),
        skillsService.readSkillIds(),
        featsService.readFeatIds()
    ])
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}