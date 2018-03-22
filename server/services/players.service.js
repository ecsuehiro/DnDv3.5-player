"use strict"

const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: _readPlayer,
    readById: _readPlayerById,
    create: _createPlayer,
    update: _updatePlayer,
    delete: _deletePlayer
}

function _readPlayer() {
    return conn.db().collection("players").find({ dateDeleted: null }).toArray()
        .then(players => {
            return players
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _readPlayerById(id) {
    return conn.db().collection("players").findOne({ _id: new ObjectId(id), dateDeleted: null })
        .then(player => {
            return player
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _createPlayer(data) {
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
            charisma: data.stats.charisma,
            fortitude: data.stats.fortitude,
            reflex: data.stats.reflex,
            will: data.stats.will
        },
        baseAttack: data.baseAttack,
        weapons: [],
        skills: [],
        feats: [],
        abilities: [],
        dateDeleted: null
    }

    if (data.weapons) {
        for (let i = 0; i < data.weapons.length; i++) {
            safeDoc.weapons.push(data.weapons[i])
        }
    }
    if (data.skills) {
        for (let j = 0; j < data.skills.length; j++) {
            safeDoc.skills.push(data.skills[j])
        }
    }
    if (data.feats) {
        for (let x = 0; x < data.feats.length; x++) {
            safeDoc.feats.push(data.feats[x])
        }
    }

    return conn.db().collection("players").insertOne(safeDoc)
        .then(player => player.insertedId.toString())
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _updatePlayer(id, data) {
    const safeDoc = {
        $set: {
            level: data.level,
            stats: {
                strength: data.stats.strength,
                dexterity: data.stats.dexterity,
                constitution: data.stats.constitution,
                intelligence: data.stats.intelligence,
                wisdom: data.stats.wisdom,
                charisma: data.stats.charisma,
                fortitude: data.stats.fortitude,
                reflex: data.stats.reflex,
                will: data.stats.will
            },
            baseAttack: data.baseAttack,
            weapons: [],
            skills: [],
            feats: [],
            abilities: []
        }
    }
    if (data.weapons) {
        for (let i = 0; i < data.weapons.length; i++) {
            safeDoc.$set.weapons.push(data.weapons[i])
        }
    }
    if (data.skills) {
        for (let j = 0; j < data.skills.length; j++) {
            safeDoc.$set.skills.push(data.skills[j])
        }
    }
    if (data.feats) {
        for (let x = 0; x < data.feats.length; x++) {
            safeDoc.$set.feats.push(data.feats[x])
        }
    }

    return conn.db().collection("players").updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(player => player.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _deletePlayer(id) {
    return conn.db().collection("players").updateOne({ _id: new ObjectId(id) }, { $set: { dateDeleted: new Date() } })
        .then(player => player.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}
