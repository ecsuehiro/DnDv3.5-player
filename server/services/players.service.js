"use strict"

const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: _read,
    readById: _readById,
    create: _create,
    update: _update,
    delete: _delete
}

function _read() {
    return conn.db().collection("players").find({ dateDeleted: null }).toArray()
        .then(players => {
            return players
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _readById(id) {
    return conn.db().collection("players").findOne({ _id: new ObjectId(id), dateDeleted: null })
        .then(player => {
            return player
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _create(data) {
    const safeDoc = {
        playerName: data.playerName,
        characterName: data.characterName,
        race: data.race,
        class: data.class,
        level: data.level,
        stats: {
            strength: data.stats.strength,
            dexterity: data.stats.dexterity,
            constitution: data.stats.constitution,
            intelligence: data.stats.intelligence,
            wisdom: data.stats.wisdom,
            charisma: data.stats.charisma
        },
        saves: {
            fortitude: data.saves.fortitude,
            reflex: data.saves.reflex,
            will: data.saves.will
        },
        baseAttack: data.baseAttack,
        weapons: [],
        skills: [],
        feats: [],
        abilities: [],
        dateDeleted: null
    }

    return conn.db().collection("players").insertOne(safeDoc)
        .then(player => player.insertedId.toString())
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _update(id, data) {
    const safeDoc = {
        $set: {
            level: data.level,
            stats: {
                strength: data.stats.strength,
                dexterity: data.stats.dexterity,
                constitution: data.stats.constitution,
                intelligence: data.stats.intelligence,
                wisdom: data.stats.wisdom,
                charisma: data.stats.charisma
            },
            saves: {
                fortitude: data.saves.fortitude,
                reflex: data.saves.reflex,
                will: data.saves.will
            },
            baseAttack: data.baseAttack,
            weapons: [],
            skills: [],
            feats: [],
            abilities: []
        }
    }

    return conn.db().collection("players").updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(player => player.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _delete(id) {
    return conn.db().collection("players").updateOne({ _id: new ObjectId(id) }, { $set: { dateDeleted: new Date() } })
        .then(player => player.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}