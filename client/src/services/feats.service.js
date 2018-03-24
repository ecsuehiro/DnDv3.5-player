import axios from 'axios'

export function readFeats() {
    return axios.get(process.env.REACT_APP_BACKEND_ORIGIN + `/api/feats`)
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