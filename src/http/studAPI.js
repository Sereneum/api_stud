import {$authHost, $host} from './index'
import {API_COURSE} from "../utils/consts";
import {parserCourseStatus} from "../parsers/parser";

export const getCourseStatus = async (course_id) => {
    const {data} = await $authHost(API_COURSE + course_id)
    return parserCourseStatus(data.data)
}