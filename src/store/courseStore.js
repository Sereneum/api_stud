import {makeAutoObservable} from "mobx";

export default class CourseStore {
    constructor() {
        this._courses = []
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

    get courses() {
        return JSON.parse(JSON.stringify(this._courses))
    }

    get activeCourse() {
        return this._activeCourse
    }
}