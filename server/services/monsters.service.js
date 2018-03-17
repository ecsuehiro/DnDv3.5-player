"use strict"

const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: _read,
    readById: _readById,
    create: _create,
    update: _update,
    deactivate: _deactivate
}

function _read() {
    return conn.db().collection("monsters").find({ dateDeactivated: null }).toArray()
    .then(monsters => {
        return monsters
    })
    .catch(err => {
        console.warn(err)
        return Promise.reject(err)
    })
}

function _readById(id) {
    return conn.db().collection("monsters").findOne({ _id: new ObjectId(id), dateDeleted: null })
        .then(monster => {
            return monster
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _create(data) {
    const safeDoc = {
        name: data.name,
        description: data.description,
        hp: data.hp,
        armor: data.armor,
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
        fullAttack: data.fullAttack,
        specialQualities: [],
        skills: [],
        feats: [],
        dateDeleted: null
    }

    return conn.db().collection("monsters").insertOne(safeDoc)
        .then(monster => monster.insertedId.toString())
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _update(id, data) {
    const safeDoc = {
        $set: {
            name: data.name,
            description: data.description,
            hp: data.hp,
            armor: data.armor,
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
            fullAttack: data.fullAttack,
            specialQualities: [],
            skills: [],
            feats: [],
            dateDeleted: null
        }
    }

    return conn.db().collection("monsters").updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(monster => monster.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _deactivate(id) {
    return conn.db().collection("monsters").updateOne({ _id: new ObjectId(id) }, { $set: { dateDeleted: new Date() } })
        .then(monster => monster.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}