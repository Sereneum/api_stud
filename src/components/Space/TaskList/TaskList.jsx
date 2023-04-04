import React, {useContext, useEffect, useState} from 'react';
import Task from "./Task";
import styles from './TaskList.module.css'
import {observer} from "mobx-react-lite";
import DutyFilesList from "../../Duty/DutyFilesList";

const TaskList = observer(({toDuty, course, activeCourse}) => {

    const [isOpenMaterials, setIsOpenMaterials] = useState(false)

    useEffect(() => {
        setIsOpenMaterials(false)
    }, [activeCourse])

    return (
        <div className={styles.tasks_block}>
            <div className={styles.tasks_block_cover}>
                {
                    course
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
                        <div className={styles.course_not_found}>
                            <p>Не найдены активные курсы</p>
                            <p>перейдите в настройки</p>
                        </div>
                }
            </div>

            {course
                &&
                <>
                    {!course.tasks.length
                        &&
                        <div className={styles.tasks_not_found}>Нет заданий</div>
                    }

                    <div className={styles.materials_breaker}></div>
                    {isOpenMaterials
                        ?
                        <DutyFilesList files={course.courseMaterials}/>
                        :
                        <div
                            className={styles.open_materials}
                            onClick={() => setIsOpenMaterials(true)}
                        >Открыть материалы</div>
                    }
                </>
            }


        </div>
    );
});

export default TaskList;