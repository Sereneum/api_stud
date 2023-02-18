import {makeAutoObservable} from "mobx";

export default class CourseStore {
    constructor() {
        this._courses = []
        this._activeCourse = 2
        makeAutoObservable(this)
    }

    setCourses(courses) {
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
    // JSON.parse(JSON.stringify(u))
}