import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


const getHostAfterLogin = (token) => {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// const key = 'AKfycbyYC-t0h9__Xp-hz12xVfZGRIEj5kdR8w0jG-RM3KkdBHVpUrLt52yqiZBFzF4-UtEZ4w'
const key = 'AKfycbwhPuNg2tS8t_vxveG0L_0W737SC5G47J6j9ctIGTa1dv3wQHobnfpnbxTdBxVUWa0H0g'
const url = `https://script.google.com/macros/s/${key}/exec?`

const $serverHost = axios.create({
        baseURL: url
    },
    {
        crossDomain: true,
        redirect: true,
        contextType: "text/plain",
        method: "POST",
        dataType: "jsonp"
    })

export const $authServerHost = axios.create({
        baseURL: `https://stud.mgri.ru/`,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

const bedAuth = error => {
    return Promise.reject(error)
}

$authHost.interceptors.request.use(authInterceptor, bedAuth)




export {
    $host,
    $authHost,
    $serverHost,
    getHostAfterLogin
}
