import {$authHost, $host} from './index'
import {API_AUTH, API_MORE_INFO} from "../utils/consts";

export const login = async(userName, password) => {
    const {data} = await $host.post(API_AUTH, {userName, password})
    let token = data.data.accessToken
    if(token !== undefined) {
        localStorage.setItem('token', token)
    }
    return token
    //     return {token: token, dataUser: data.data.user}
    // } else  return {token: undefined, dataUser: {}}
}

export const check = async () => {
    const {data} = await $authHost.get(API_AUTH)
    let more = {}
    if(data.state) {
        more = await $authHost.get(API_MORE_INFO + data.data.user.anotherID)
        return {dataState: true, dataUser: data.data.user, moreInfo: more.data.data}
    } else return {dataState: false, dataUser: {}, moreInfo: {}}
}
