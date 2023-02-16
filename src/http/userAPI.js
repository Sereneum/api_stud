import {$authHost, $host} from './index'
import {API_AUTH} from "../utils/consts";

export const login = async(userName, password) => {
    const {data} = await $host.post(API_AUTH, {userName, password})
    let token = data.data.accessToken
    if(token !== undefined) localStorage.setItem('token', token)
    return token
}

export const check = async () => {
    const {data} = await $authHost.get(API_AUTH)
    return data.state === 1
}