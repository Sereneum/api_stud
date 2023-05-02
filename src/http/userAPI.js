import {$authHost, $host, getHostAfterLogin} from './index'
import {API_AUTH, API_MORE_INFO} from "../utils/consts";

export const login = async (userName, password) => {
    const {data} = await $host.post(API_AUTH, {userName, password})
    let token = data.data.accessToken
    if (token !== undefined) {
        localStorage.setItem('token', token)
        let u, more

        let $hostAfterLogin = getHostAfterLogin(token)


        await $hostAfterLogin.get(API_AUTH)
            .then(d => u = d.data.data.user)

        await $hostAfterLogin.get(API_MORE_INFO + u.anotherID)
            .then(m => more = m.data.data)


        return {token, dataUser: u, moreInfo: more}
    } else return {token: '', dataUser: {}, moreInfo: {}}
}

export const check = async () => {
    let badAnswer = {dataState: false, dataUser: {}, moreInfo: {}}
    let data, more


    await $authHost.get(API_AUTH)
        .catch(e => badAnswer)
        .then(d => data = d.data)

    await $authHost.get(API_MORE_INFO + data.data.user.anotherID)
        .then(m => more = m.data)
        .catch(e => badAnswer)

    return {dataState: true, dataUser: data.data.user, moreInfo: more.data}
}
