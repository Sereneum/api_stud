import {useEffect, useState} from "react";

export const useDeadlineList = ({course}) => {
    const [deadlineTasks, setDeadlineTasks] = useState([])

    useEffect(() => {
        setDeadlineTasks(createDeadlines(course.courses))
    }, [course.courses])


    return {deadlineTasks}
}

const createDeadlines = (courseList) => {
    let tasks = []
    for (let item of courseList)
        for (let task of item.tasks)
            if ((!task.statusID || task.statusID === 3) && Date.now() < Date.parse(task.periodRealization))
                tasks.push({...task, courseName: item.course_name})


    return tasks
        .sort((a, b) => b.deadline - a.deadline)
        .slice(-3)
        .sort((a, b) => a.deadline - b.deadline)
}
