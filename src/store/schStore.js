import {makeAutoObservable} from "mobx";

export default class SchStore {
    constructor() {
        this._currentWeek = null
        this._calendar = {}
        makeAutoObservable(this)
    }

    setCurrentWeek(weekID) {
        this._currentWeek = weekID
    }

    setCalendar(calendar) {
        this._calendar = calendar
    }

    get currentWeek() {
        return this._currentWeek
    }

    get calendar() {
        return this._calendar ? JSON.parse(JSON.stringify(this._calendar)) : {}
    }
}