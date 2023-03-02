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

const key = 'AKfycbxY3qzHcPlF-GCczKkGHIE1_zy4dCWi3roOjTTDx3kVIY7s7jOu0WQTzKUtDhfUIzxUfw'
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
