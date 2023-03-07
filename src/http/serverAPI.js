import {$serverHost} from "./index";

export const isFindUserInServer = async (id) => {
    try{

    let body = JSON.stringify({
        id: id,
        type: "availability"
    })
    let answer
    await $serverHost.post('', body)
        .then(d => answer = d.data)
        .catch(e => answer = {status: 0, error: e})


    return answer
    } catch (err) {return {status: 0, error: err} }

}

export const addUserData = async ({id, active=[]}) => {
    try {
        let body = JSON.stringify({
            id: id,
            active: JSON.stringify(active),
            type: "add"
        })
        let answer
        // console.log('body - ', body)
        await $serverHost.post('', body)
            .then(d => answer = d.data)
            .catch(e => answer = {status: 0, error: e})

        return answer
    } catch (err) {return {status: 0, error: err} }
}

export const getUserData = async (id) => {
    try {
        let body = JSON.stringify({
            id: id,
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

