import {$authHost, $host} from './index'
import {API_COURSE} from "../utils/consts";
import {parserCourseStatus} from "../parsers/parser";

export const getCourseStatus = async (course_id) => {
    const {data} = await $authHost(API_COURSE + course_id)
    return parserCourseStatus(data.data)
}

export const preloadingCourse = async (courses) => {
    const promises = courses.map(i => getCourseStatus(i.course_id))
    const res = await Promise.all(
        promises.map(p => p.then())
    )
    return res.map(
        (i, index) => {
            return {course_id: courses[index].course_id, tasks: i.tasks, course: courses[index]}
        }
    )
}