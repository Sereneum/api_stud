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

export const parserDateNow = (date=null) => {
    const now = date ? date : new Date()

    return now.getFullYear() + '-'
        +
        ((now.getMonth() + 1).toString().length < 2
            ?
            '0' + (now.getMonth() + 1)
            :
            (now.getMonth() + 1))
        + '-' + (now.getDate().toString().length < 2 ? '0' + now.getDate() : now.getDate())
}

export const parserDateNowForSch = (date=null) => {

    const now = date ? new Date(date) : new Date()

    return now.getDate()  + '.'
        +
        ((now.getMonth() + 1).toString().length < 2
            ?
            '0' + (now.getMonth() + 1)
            :
            (now.getMonth() + 1))
        + '.' + now.getFullYear()
}


export const antidoteNewDate = (date) => {
    let t = date.split(/[- :]/)
    let d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5])
    return new Date(d)
}