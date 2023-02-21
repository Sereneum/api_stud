import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
//
// const $hostAfterLogin = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     headers: {
//         Authorization: `Bearer ${}`
//     }
// })

const getHostAfterLogin = (token) => {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const $serverHost = axios.create({
    baseURL: process.env.REACT_APP_SERVER_API_URL
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
