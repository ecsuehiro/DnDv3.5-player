"use strict"

const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: _read,
    readSkillIds: _readSkillIds,
    readById: _readById,
    create: _create,
    update: _update,
    delete: _delete
}

function _read() {
    return conn.db().collection("skills").find({ dateDeleted: null }).toArray()
        .then(skills => {
            return skills
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _readSkillIds() {
    return conn.db().collection("skills").aggregate([
        {
            $project: {
                skillName: 1
            }
        }
    ]).toArray()
        .then(skills => {
            return skills
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _readById(id) {
    return conn.db().collection("skills").findOne({ _id: new ObjectId(id), dateDeleted: null })
        .then(skill => {
            return skill
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _create(data) {
    const safeDoc = {
        skillName: data.skillName,
        modifier: data.modifier,
        description: data.description,
        classes: [],
        dateDeleted: null
    }

    return conn.db().collection("skills").insertOne(safeDoc)
        .then(skill => skill.insertedId.toString())
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _update(id, data) {
    const safeDoc = {
        $set: {
            skillName: data.skillName,
            modifier: data.modifier,
            description: data.description,
            classes: [],
        }
    }

    return conn.db().collection("skills").updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(skill => skill.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _delete(id) {
    return conn.db().collection("skills").updateOne({ _id: new ObjectId(id) }, { $set: { dateDeleted: new Date() } })
        .then(skill => skill.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}