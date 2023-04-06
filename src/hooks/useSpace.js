import React, {useEffect} from "react";
import Duty from "../components/Duty/Duty";
import TaskList from "../components/Space/TaskList/TaskList";

export const useSpace = (course) => {
    const activeCourseIndex = course.activeCourse
    const valueActiveCourse = course.courses[course.activeCourse]

    useEffect(() => {
        console.log(course.mainMode)
    }, [course.mainMode])



    const getDuty = (taskIndex) => <Duty
        taskIndex={taskIndex}
        toBack={() => course.setMainMode('course')}
    />

    const getTaskList = (toDuty) =>  <TaskList
        toDuty={toDuty}
        course={valueActiveCourse}
        activeCourse={activeCourseIndex}
    />

    return {getDuty, getTaskList}
}

