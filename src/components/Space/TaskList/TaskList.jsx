import React from 'react';
import Task from "./Task";
import styles from './TaskList.module.css'
import {observer} from "mobx-react-lite";

const TaskList = observer(({course}) => {

    // console.log(course.courses[course.activeCourse].tasks)

    return (
        <div className={styles.tasks_block}>
            <div
                className={styles.title}>{course.courses ? course.courses[course.activeCourse].course.course_name : 'пусто'}</div>
            <div className={styles.task_list}>
                {course.courses[course.activeCourse].tasks.map((i, index) => <Task key={`t${index}`}
                                                                                   index={index + 1} task={i}
                                                                                   size={course.courses[course.activeCourse].tasks.length}/>)}
            </div>
        </div>
    );
});

export default TaskList;