import {$serverHost} from "./index";

export const isFindUserInServer = async (email) => {
    try{


    let body = JSON.stringify({
        email: email,
        type: "availability"
    })
    let answer
    await $serverHost.post('', body)
        .then(d => answer = d.data)
        .catch(e => answer = {status: 0, error: e})


    return answer
    } catch (err) {return {status: 0, error: err} }

}

export const addUserData = async ({email, active, passive}) => {
    try {
        let body = JSON.stringify({
            email: email,
            active: active,
            passive: passive,
            type: "add"
        })
        let answer
        await $serverHost.post('', body)
            .then(d => answer = d.data)
            .catch(e => answer = {status: 0, error: e})

        return answer
    } catch (err) {return {status: 0, error: err} }
}

export const getUserData = async ({email}) => {
    try {
        let body = JSON.stringify({
            email: email,
            type: "get"
        })
        let answer
        await $serverHost.post('', body)
            .then(d => answer = d.data)
            .catch(e => answer = {status: 0, error: e})

        // console.log(answer)

        return answer
    } catch (err) {return {status: 0, error: err} }
}

