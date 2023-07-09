// ?? Для чего этот файл?*
// тут будут вспомогательные функции парсинга данных с сервер для файла: epochServer.js


// Разделение курсов на active/passive
import {$authHost} from "../http";
import {API_DETAIL_TASK, API_DUTY} from "../utils/consts";
import {epoch_courseData} from "./epochServer";
import {all} from "axios";

export const preEpoch_division = (active, all) => {
    const passive = []
    for (let i of all) {
        let isPresent = false
        for (let j of active) {
            if (i.course_id === j.course_id) {
                isPresent = true;
                break
            }
        }

        if (!isPresent) passive.push(i)
    }
    return {active: active, passive: passive}
}

// const preEpoch_getDetailTaskListData = (list) => {
//     return new Promise((resolve, reject) => {
//         Promise.all(list.map(
//             i => new Promise((rs, rj) => {
//                 $authHost(API_DETAIL_TASK + i).then(d => rs(d.data.data.listCourseTaskStudent[0]))
//             })
//         ))
//             .then(p => resolve(p))
//     })
// }

export const preEpoch_getDetailTaskData = (task_id) => {
    return new Promise((resolve, reject) => {
        $authHost(API_DETAIL_TASK + task_id).then(d => resolve(d.data.data.listCourseTaskStudent[0]))
    })
}

const preEpoch_deadlineParser = deadline => {
    let hours = (Date.parse(deadline) - Date.now()) / (1000 * 60 * 60) + 24
    return hours > 0 ? Math.round(hours) : 0
}


export const preEpoch_mergeCourseData = (user_data, duty_data, course_id, course_name = '') => {
    return new Promise((resolve, reject) => {
        const courseMaterials = duty_data.listFiles
        const courseThemes = duty_data.listCourseThemes
        const preTasks = user_data.listSelectedTasks
        const listStatus = ["Просрочено", "В проверке", "На доработке", "Выполнено", "Не отправлено"]



        // console.log('user_data', user_data)
        // console.log('duty_data', duty_data)

        // список ID каждого задания
        // const _listCourseTaskID = preTasks.map(i => i.courseTaskID)

        // подгрузка детальной информации о каждом задании в курсе
        // preEpoch_getDetailTaskData(_listCourseTaskID).then(detailData => {
            const tasks = []
            for(let i = 0; i < preTasks.length; ++i){
                let task_status = preTasks[i].taskExpired.statusID === null ? 0 : preTasks[i].taskExpired.statusID
                tasks.push({
                    courseID: preTasks[i].courseID,
                    courseTaskID: preTasks[i].courseTaskID,
                    courseName: course_name,
                    dateAdded: preTasks[i].dateAdded,
                    taskFile: preTasks[i].file,
                    // studentFiles: detailData[i].files,
                    nameTask: preTasks[i].nameTask,
                    numberTask: preTasks[i].numberTask,
                    periodRealization: preTasks[i].periodRealization,
                    deadline: preEpoch_deadlineParser(preTasks[i].periodRealization),
                    // notation: detailData[i].notation,
                    // lastFileDate: detailData[i].lastFileDate,
                    userFIO: preTasks[i].userFIO,
                    statusID: task_status,
                    statusName: task_status === 0 ? 'Не отправлено' : listStatus[task_status - 1]
                })
            }

            // окончательная информация о курсе
            resolve({
                course_id,
                course_name,
                courseMaterials,
                courseThemes,
                tasks
            })
        })
    // })
}


export const preEpoch_reconstructionCourses = (before = [], after = [], courses) => {
    return new Promise((resolve, reject) => {
        const list = new Array(after.length)
        const promises = []

        const detective = (item) => {
            let isFind = false
            for (let i = 0; i < list; ++i)
                if (item.course_id === list[i].course_id)
                    return {isFind: true, course: {...list[i], course_name: item.course_name}}

            return {isFind: false}
        }

        const loading = (item, index) => {
            return new Promise((rs, rj) => {
                epoch_courseData(item.course_id)
                    .then(new_course => {
                        rs({index: index, course: {...new_course, course_name: item.course_name}})
                    })
            })
        }


        for (let i = 0; i < after.length; ++i) {
            let det_result = detective(after[i])
            if (det_result.isFind)
                list[i] = det_result.course
            else
                promises.push(loading(after[i], i))
        }

        Promise.all(promises).then(all_promises => {
            for(let item_promise of all_promises)
                list[item_promise.index] = item_promise.course
            resolve(list)
        })




        // epoch_courseData(new_course_id).then(new_course => {
        //     console.log('new_course: ', new_course)
        //     new_course.course_name = after[after.length - 1].course_name
        //     courses.push(new_course)
        //
        //     resolve({isWithoutChanges: false, courses: courses})
        // })
    })
}

export const preEpoch_reboot = (course_id, courses) => new Promise((resolve, reject) => {
    epoch_courseData(course_id)
        .then(new_course => {
            // console.log(new_course)
            let ans = []
            for(let i = 0; i < courses.length; ++i) {
                if(courses.course_id === course_id)
                    ans.push(new_course)
                else
                    ans.push(courses[i])
            }
            resolve(ans)
        })
})











