import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._token = ''
        this._user = {}
        this._detailed = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setToken(token) {
        this._token = token
    }

    setUser(u) {
        this._user = JSON.parse(JSON.stringify(u))
    }

    setDetailed(detailed) {
        this._detailed = detailed
    }

    get isAuth() {
        return this._isAuth
    }

    get token() {
        return this._token
    }

    get user() {
        return JSON.parse(JSON.stringify(this._user))
    }

    get detailed() {
        return JSON.parse(JSON.stringify(this._detailed))
    }
}