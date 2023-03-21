import {$authHost, $host} from './index'
import {API_ALL_COURSES, API_COURSE, API_DUTY} from "../utils/consts";
import {parserCourseStatus} from "../parsers/parser";

export const getCourseStatus = async ({course_id, course_name}) => {
    const {data} = await $authHost(API_COURSE + course_id)
    return parserCourseStatus({data: data.data, course_name})
}

export const getDataDuty = async ({course_id, course_name=null}) => {

    let user_data = new Promise((resolve, reject) => {
        $authHost(API_COURSE + course_id).then(d => resolve(d.data.data))
    })

    let duty_data = new Promise((resolve, reject) => {
        $authHost(API_DUTY + course_id).then(d => resolve(d.data.data))
    })

    const promises = [user_data, duty_data]
    const res = await Promise.all(
        promises.map(p => p.then())
    )

    return {user_data: res[0], duty_data: res[1]}
}

export const fullGetDataDuty = async (courses) => {
    const promises = courses.map(i => getDataDuty({course_id: i.course_id}))
    const res = await Promise.all(
        promises.map(p => p.then())
    )

    return res
}

export const preloadingCourse = async (courses) => {
    const promises = courses.map(i => getCourseStatus({course_id: i.course_id, course_name: i.course_name}))
    const res = await Promise.all(
        promises.map(p => p.then())
    )
    return res.map(
        (i, index) => {
            return {course_id: courses[index].course_id, tasks: i.tasks, course: courses[index]}
        }
    )
}

export const getAllCourses = async () => {
    const {data} = await $authHost(API_ALL_COURSES)
    return data.data.listCourse.reverse()
}
