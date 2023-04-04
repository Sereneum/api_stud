import {$authHost, $authServerHost, $serverHost} from "../http";
import {API_ALL_COURSES, API_COURSE, API_DELETE_FILE, API_DUTY, API_UPLOAD_FILE} from "../utils/consts";
import {preEpoch_division, preEpoch_mergeCourseData} from "./preEpoch";

const conv = data => {
    console.log(data)
    if (!data) return []
    if (typeof 'data' === 'string') return JSON.parse(data)
    else return data
}

// Загрузка активных курсов с бд
export const epoch_fetchActiveCourses = async (id) => {
    return new Promise((resolve, reject) => {
        let body = JSON.stringify({id, type: "get"})
        $serverHost.post('', body)
            .then(d => resolve(conv(d.data.data.active)))
            .catch(err => reject(err))
    })
}

// Обновление активных курсов в бд
export const epoch_updateActiveCourses = async (id, active = []) => {
    return new Promise((resolve, reject) => {
        let body = JSON.stringify({
            id,
            active: JSON.stringify(active),
            type: "add"
        })
        $serverHost.post('', body)
            .then(d => {
                console.log('epoch_updateActiveCourses -> result = ', d.data)
                resolve(d.data)
            })
            .catch(e => reject({status: 0, error: e}))
    })
}

// Загрузка всех курсов со студа
const fetchAllCourses = async (id) => {
    return new Promise((resolve, reject) => {
        $authHost(API_ALL_COURSES)
            .then(d =>
                resolve(d.data.data.listCourse.reverse()
                    .map(i => ({course_id: i.courseID, course_name: i.discipline}))))
            .catch(err => reject(err))
    })
}

// Получение всех active/passive курсов
export const epoch_fetchConfigurableCourses = (id) => {
    return new Promise((resolve, reject) => {
        Promise.all([epoch_fetchActiveCourses(id), fetchAllCourses(id)])
            .then(r => resolve(preEpoch_division(r[0], r[1])))
            .catch(err => reject(err))
    })
}


export const epoch_courseData = (course_id, course_name = '') => {

    return new Promise((resolve, reject) => {
        const user_data = new Promise((resolve, reject) => {
            $authHost(API_COURSE + course_id).then(d => resolve(d.data.data))
        })

        const duty_data = new Promise((resolve, reject) => {
            $authHost(API_DUTY + course_id).then(d => resolve(d.data.data))
        })

        Promise.all([user_data, duty_data])
            .then(p => {
                resolve(preEpoch_mergeCourseData(p[0], p[1], course_id, course_name))
            })
    })
}

export const epoch_allCourseData = (id) => {
    return new Promise((resolve, reject) => {
        // подгрузка активных курсов с бд
        epoch_fetchActiveCourses(id)
            .then(active => {
                Promise.all(
                    active.map(i => epoch_courseData(i.course_id, i.course_name))
                ).then(r => resolve(r))
            })
    })
}


export const epoch_uploadFile = ({formData}) => {
    return new Promise((resolve, reject) => {

        $authServerHost.post(API_UPLOAD_FILE, formData)
            .then(d => {
                resolve(d.data)
            })
            .catch(e => e)
    })
}

export const epoch_deleteFile = (fileID) => new Promise((resolve, reject) => {
    $authServerHost.delete(API_DELETE_FILE + fileID)
        .then(d => resolve(d.data))
        .catch(e => e)
})
