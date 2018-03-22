import axios from 'axios'

export function readWeaponIds() {
    return axios.get(`${process.env.REACT_APP_BACKEND_ORIGIN}/api/weapons/weapon-ids`)
        .then(onSuccess)
        .catch(onError)
}

function onSuccess(response) {
    return response
}

function onError(error) {
    console.warn(error)
    return Promise.reject(error)
}