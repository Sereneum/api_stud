import React from 'react';
import Task from "./Task";
import styles from './TaskList.module.css'
import {observer} from "mobx-react-lite";

const TaskList = observer(({course}) => {


    console.log(course.courses)

    return (
        <div className={styles.tasks_block}>
            <div
                className={styles.title}>
                {!course.courses
                    ?
                    course.courses[course.activeCourse].course.course_name
                    :
                    ''}
            </div>

            {!course.courses
                ?
                <div className={styles.task_list}>
                    {
                        course.courses[course.activeCourse].tasks.map((i, index) => <Task key={`t${index}`}
                                                                                          index={index + 1} task={i}
                                                                                          size={course.courses[course.activeCourse].tasks.length}/>)}
                </div>
                :
                <div className={styles.task_not_found}>
                    <p>Не найдены активные курсы</p>
                    <p>перейдите в найтройки</p>
                </div>
            }

        </div>
    );
});

export default TaskList;