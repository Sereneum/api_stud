import {$authHost, $authServerHost, $serverHost} from "../http";
import {
    API_ALL_COURSES,
    API_CHECKER_MAIL,
    API_COURSE,
    API_DELETE_FILE,
    API_DUTY,
    API_UPLOAD_FILE
} from "../utils/consts";
import {preEpoch_division, preEpoch_mergeCourseData} from "./preEpoch";
import {parserDateNow} from "../managers/parser";

const conv = data => {
    // if (!data) return []
    // if (typeof 'data' === 'string') return JSON.parse(data)
    // else return data

    let conv_data = {...data}

    if(!conv_data.active)
        conv_data.active = []
    if (typeof conv_data.active === 'string')
        conv_data.active = JSON.parse(conv_data.active)

    if(!conv_data.settings)
        conv_data.settings = {}
    if (typeof conv_data.settings === 'string')
        conv_data.settings = JSON.parse(conv_data.settings)

    return conv_data
}


// Загрузка активных курсов с бд
export const epoch_fetchServerData = async (id) => {
    return new Promise((resolve, reject) => {
        let body = JSON.stringify({id, type: "get"})
        // console.log('body: ', body)
        $serverHost.post('', body)
            .then(d => {
                console.log(conv(d.data.data))
                resolve(conv(d.data.data))
            })
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


// Обновление настроек в бд
export const epoch_updateSettings = async (id, settings = {}) => {
    return new Promise((resolve, reject) => {
        let body = JSON.stringify({
            id,
            settings: JSON.stringify(settings),
            type: "add"
        })
        $serverHost.post('', body)
            .then(d => {
                console.log('epoch_updateSettings -> result = ', d.data)
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
        Promise.all([epoch_fetchServerData(id), fetchAllCourses(id)])
            .then(r => resolve(preEpoch_division(r[0].active, r[1])))
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

export const epoch_preloadingAllData = (id) => {
    return new Promise((resolve, reject) => {
        // подгрузка активных курсов с бд + настроек
        epoch_fetchServerData(id)
            .then(serverData => {
                Promise.all(
                    serverData.active.map(i => epoch_courseData(i.course_id, i.course_name))
                ).then(r => resolve({courses: r, settings: serverData.settings}))
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

export const epoch_checkerMail = () => new Promise((resolve, reject) => {
    $authServerHost.get(API_CHECKER_MAIL)
        .then(d => resolve(d.data))
        .catch(e => e)
})

export const epoch_schedule = ({groupID, weekID = parserDateNow(), isCalendar = false}) =>
    new Promise((resolve, reject) => {

        // console.log('epoch_schedule', groupID, weekID)

        const apiUrl = `/api/Rasp?idGroup=${groupID}&sdate=${weekID ? weekID : parserDateNow()}`
        const apiCalendarUrl = `api/GetRaspDates?idGroup=${groupID}`

        const promiseList = [
            new Promise((resCurrentWeek, rejCurrentWeek) => {
                $authServerHost.get(apiUrl)
                    .then(r => resCurrentWeek(r.data.data))
                    .catch(err => rejCurrentWeek(err))
            })
        ]
        if (!isCalendar) promiseList.push(
            new Promise((resCalendarData, rejCalendarData) => {
                $authServerHost.get(apiCalendarUrl)
                    .then(r => resCalendarData(r.data.data))
                    .catch(err => rejCalendarData(err))
            })
        )
        Promise.all(promiseList)
            .then(r => resolve(r))


        // const currentWeek = new Promise((resCurrentWeek, rejCurrentWeek) => {
        //     $authServerHost.get(apiUrl)
        //         .then(r => resCurrentWeek(r.data.data))
        //         .catch(err => rejCurrentWeek(err))
        // })
        //
        // const calendarData = new Promise((resCalendarData, rejCalendarData) => {
        //     $authServerHost.get(apiCalendarUrl)
        //         .then(r => resCalendarData(r.data.data))
        //         .catch(err => rejCalendarData(err))
        // })

        // const promiseList = [currentWeek];
        // console.log('isCalendar', isCalendar)
        // if(!isCalendar) promiseList.push(calendarData)
        //
        // Promise.all(promiseList)
        //     .then(r => resolve(r))


    })
