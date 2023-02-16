export const parserCourseStatus = (data) => {
    let object = {
        tasks: []
    }
    for(let i of data.listSelectedTasks) {
        object.tasks.push({
            name: i.nameTask,
            statusID: i.taskExpired.statusID === null ? 0 : i.taskExpired.statusID,
            statusName: i.taskExpired.statusID === null ? 'Не отправлено' : data.listStatus[i.taskExpired.statusID - 1].statusName,
            numberTask: i.numberTask,
            deadline: getDeadline(i.periodRealization)
        })
    }
    return object
}

let getDeadline = deadline => {
    let day = 1000 * 60 * 60 * 24
    let days = (Date.parse(deadline) - Date.now()) / day
    return days > 0 ? Math.round(days) + ' дней' : 'конец'
}