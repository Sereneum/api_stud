import {$serverHost} from './index'
import {API_COURSE, SERVER_API_NEW_SETTINGS} from "../utils/consts";


export const newSettings = async list => {
    const {data} = await $serverHost.post(SERVER_API_NEW_SETTINGS, {list})
    return data
}

