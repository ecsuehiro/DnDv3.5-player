import axios from 'axios'

export function readPlayers() {
    return axios.get(`${process.env.REACT_APP_BACKEND_ORIGIN}/api/players`)
        .then(onSuccess)
        .catch(onError)
}

export function readPlayerById(id) {
    return axios.get(`${process.env.REACT_APP_BACKEND_ORIGIN}/api/players/${id}`)
    .then(onSuccess)
    .catch(onError)
}

export function createPlayer(data) {
    return axios.post(process.env.REACT_APP_BACKEND_ORIGIN + '/api/players', data)
    .then(onSuccess)
    .catch(onError)
}

export function updatePlayer(id, data) {
    return axios.put(process.env.REACT_APP_BACKEND_ORIGIN + `/api/players/${id}`, data)
    .then(onSuccess)
    .catch(onError)
}

export function deactivatePlayer(id) {
    return axios.delete(process.env.REACT_APP_BACKEND_ORIGIN + `/api/players/${id}`)
    .then(onSuccess)
    .catch(onError)
}

function onSuccess(response) {
    return response
}

function onError(error) {
    console.log(error)
    return Promise.reject(error)
}