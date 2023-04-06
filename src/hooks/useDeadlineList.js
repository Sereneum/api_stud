import {useEffect, useState} from "react";

export const useDeadlineList = (courseList) => {
    const [deadlineTasks, setDeadlineTasks] = useState([])

    useEffect(() => {
        setDeadlineTasks(createDeadlines(courseList))
    }, [courseList])


    return {deadlineTasks}
}

const createDeadlines = (courseList) => {
    let tasks = []
    for (let item of courseList)
        for (let task of item.tasks)
            if (!task.statusID) tasks.push(task)

    return tasks.slice(-3).sort((a, b) => a.deadline - b.deadline)
}
