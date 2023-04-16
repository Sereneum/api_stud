export const sch_parser = (lessons) => {
    // console.log('lessons', lessons)
    // console.log(Date.now().toString())


    // console.log(lessons[0]['деньНедели'], ':', lessons[0]['день_недели'])
    // console.log(new Date().getDay())
    // console.log(lessons[0]['дата'].split('T')[0])
    // console.log(convNow())

    const week = []

    for (let lesson of lessons) {
        const dayIndex = lesson['деньНедели']
        const day = lesson['день_недели']

        const lesDayId = lesson['деньНедели']
        const currentDayId = new Date().getDay()
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
