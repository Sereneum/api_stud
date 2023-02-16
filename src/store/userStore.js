import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._token = ''
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setToken(token) {
        this._token = token
    }

    get isAuth() {
        return this._isAuth
    }

    get token() {
        return this._token
    }
}