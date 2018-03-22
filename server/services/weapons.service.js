"use strict"

const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: _read,
    readWeaponIds: _readWeaponIds,
    readById: _readById,
    create: _create,
    update: _update,
    delete: _delete
}

function _read() {
    return conn.db().collection("weapons").find({ dateDeleted: null }).toArray()
        .then(weapons => {
            return weapons
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _readWeaponIds() {
    return conn.db().collection("weapons").aggregate([
        {
            $project: {
                weaponName: 1
            }
        }
    ]).toArray()
        .then(weapons => {
            return weapons
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _readById(id) {
    return conn.db().collection("weapons").findOne({ _id: new ObjectId(id), dateDeleted: null })
        .then(weapon => {
            return weapon
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _create(data) {
    const safeDoc = {
        weaponName: data.weaponName,
        dmgS: data.dmgS,
        dmgM: data.dmgM,
        crit: data.crit,
        range: data.range,
        type: data.type,
        notes: data.notes,
        dateDeleted: null
    }

    return conn.db().collection("weapons").insertOne(safeDoc)
        .then(weapon => weapon.insertedId.toString())
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _update(id, data) {
    const safeDoc = {
        $set: {
            weaponName: data.weaponName,
            dmgS: data.dmgS,
            dmgM: data.dmgM,
            crit: data.crit,
            range: data.range,
            type: data.type,
            notes: data.notes
        }
    }

    return conn.db().collection("weapons").updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(weapon => weapon.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _delete(id) {
    return conn.db().collection("weapons").updateOne({ _id: new ObjectId(id) }, { $set: { dateDeleted: new Date() } })
        .then(weapon => weapon.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}