import {makeAutoObservable} from "mobx";

export default class CourseStore {
    constructor() {
        this._courses = []
        this._full = {user_data: {}, duty_data: {}}
        this._activeCourse = 0
        makeAutoObservable(this)
    }

    setCourses(courses) {
        this._activeCourse = 0
        this._courses = courses
    }

    setActiveCourse(activeCourse) {
        this._activeCourse = activeCourse
    }

    setFull(data) {
        this._full = data
    }

    get courses() {
        return JSON.parse(JSON.stringify(this._courses))
    }

    get activeCourse() {
        return this._activeCourse
    }

    get full() {
        return JSON.parse(JSON.stringify(this._full))
    }
}