import {makeAutoObservable} from "mobx";

export default class SettingsStore {
    constructor() {
        this._settings = {}
        makeAutoObservable(this)
    }

    setSettings(settings) {
        this._settings = settings
    }


    get settings() {
        return this._settings ? JSON.parse(JSON.stringify(this._settings)) : {}
    }
}