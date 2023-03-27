import React, {useContext, useState} from 'react';
import Task from "./Task";
import styles from './TaskList.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const TaskList = observer(({toDuty, course, activeCourse}) => {


    return (
        <div className={styles.tasks_block}>
            {course
                ?
                <>
                    <div
                        className={styles.title}>{course.course_name}</div>
                    <div className={styles.task_list}>
                        {
                            course.tasks.map((i, index) => <Task key={`t${index}`}
                                                                         index={index + 1}
                                                                         task={i}
                                                                         size={course.tasks.length}
                                                                         toDuty={
                                                                             () => toDuty({
                                                                                 courseIndex: activeCourse,
                                                                                 taskIndex: index
                                                                             })}
                            />)}
                    </div>
                </>
                :
                <div className={styles.task_not_found}>
                    <p>Не найдены активные курсы</p>
                    <p>перейдите в настройки</p>
                </div>
            }
        </div>
    );
});

export default TaskList;