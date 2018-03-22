"use strict"

const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: _read,
    readById: _readById,
    readFeatIds: _readFeatIds,
    create: _create,
    update: _update,
    delete: _delete
}

function _read() {
    return conn.db().collection("feats").find({ dateDeleted: null }).toArray()
        .then(feats => {
            return feats
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _readFeatIds(){
    return conn.db().collection("feats").aggregate([
        {
            $project: {
                featName: 1
            }
        }
    ]).toArray()
    .then(feats => {
        return feats
    })
    .catch(err => {
        console.warn(err)
        return Promise.reject(err)
    })
}

function _readById(id) {
    return conn.db().collection("feats").findOne({ _id: new ObjectId(id), dateDeleted: null })
        .then(feat => {
            return feat
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _create(data) {
    const safeDoc = {
        featName: data.featName,
        prerequisites: data.prerequisites,
        benefit: data.benefit,
        dateDeleted: null
    }

    return conn.db().collection("feats").insertOne(safeDoc)
        .then(feat => feat.insertedId.toString())
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _update(id, data) {
    const safeDoc = {
        $set: {
            featName: data.featName,
            prerequisites: data.prerequisites,
            benefit: data.benefit
        }
    }

    return conn.db().collection("feats").updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(feat => feat.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _delete(id) {
    return conn.db().collection("feats").updateOne({ _id: new ObjectId(id) }, { $set: { dateDeleted: new Date() } })
        .then(feat => feat.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}