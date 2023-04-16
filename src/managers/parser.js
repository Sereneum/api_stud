export const parserCourseStatus = ({data, course_name}) => {
    let object = {
        tasks: []
    }
    for(let i of data.listSelectedTasks) {
        // console.log(i)
        object.tasks.push({
            name: i.nameTask,
            statusID: i.taskExpired.statusID === null ? 0 : i.taskExpired.statusID,
            statusName: i.taskExpired.statusID === null ? 'Не отправлено' : data.listStatus[i.taskExpired.statusID - 1].statusName,
            numberTask: i.numberTask,
            deadline: getDeadline(i.periodRealization),
            taskID: i.courseTaskID,
            courseID: i.courseID,
            file: i.file,
            course_name: course_name
        })
    }
    return object
}

let getDeadline = deadline => {
    let hours = (Date.parse(deadline) - Date.now()) / (1000 * 60 * 60) + 24
    return hours > 0 ? Math.round(hours) : 0
}

export const parserDateNow = () => {
    const now = new Date()

    return now.getFullYear() + '-'
        +
        ((now.getMonth() + 1).toString().length < 2
            ?
            '0' + (now.getMonth() + 1)
            :
            (now.getMonth() + 1))
        + '-' + now.getDate()
}
