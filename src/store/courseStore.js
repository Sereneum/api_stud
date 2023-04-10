import {makeAutoObservable} from "mobx";

export default class CourseStore {
    constructor() {
        this._courses = []
        this._activeCourse = 0
        this._mainMode = 'courses'
        makeAutoObservable(this)
    }

    setCourses(courses) {
        this._activeCourse = 0
        this._courses = courses
    }

    setMainMode(mainMode) {
        this._mainMode = mainMode
    }

    setActiveCourse(activeCourse) {
        this._activeCourse = activeCourse
    }

    get courses() {
        return JSON.parse(JSON.stringify(this._courses))
    }

    get mainMode() {
        return this._mainMode
    }

    get activeCourse() {
        return this._activeCourse
    }
}