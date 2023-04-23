import {parserDateNow, parserDateNowForSch} from "../../../managers/parser";

export const sch_parser = (lessons, weekID=null) => {


    const week = []


    const currentDayId = weekID
        ?
        new Date(weekID).getDay()
        :
        new Date().getDay()

    for (let lesson of lessons) {
        const dayIndex = lesson['деньНедели']
        const day = lesson['день_недели']

        const lesDayId = lesson['деньНедели']

        if(currentDayId > lesDayId) continue

        let isFind = findDay(week, dayIndex)
        if (isFind !== -1) week[isFind].lessons.push(lesson)
        else week.push({
            dayIndex,
            day,
            date: lesson['дата'].split('T')[0].split('-').reverse().join('.'),
            lessons: [lesson]
        })
    }

    return week
}


const findDay = (week, ind) => {
    for (let i = 0; i < week.length; ++i)
        if (week[i].dayIndex === ind) return i

    return -1
}
