import React, {useContext, useEffect, useState} from 'react';
import Task from "./Task";
import styles from './TaskList.module.css'
import {observer} from "mobx-react-lite";
import DutyFilesList from "../../Duty/DutyFilesList";
import {useMediaQuery} from 'react-responsive'
import TaskListMaterialsBlock from "./TaskListMaterialsBlock";

const TaskList = observer(({desktopMove, course, activeCourseIndex, mobileMove}) => {

    const [isOpenMaterials, setIsOpenMaterials] = useState(false)

    const isMobile = useMediaQuery({query: '(max-width: 600px)'})

    const toCourses = () => {

    }

    useEffect(() => {
        setIsOpenMaterials(false)
    }, [activeCourseIndex])


    const toDuty = ({courseIndex, taskIndex}) => {
        isMobile
            ?
            mobileMove.openDuty({courseIndex, taskIndex})
            :
            desktopMove.openDuty({courseIndex, taskIndex})
    }

    if (!(course)) {
        // в дальнейшем переход к настройкам курса
        return <>
            <div className={styles.tasks_block}>
                <div className={styles.tasks_block_cover}>
                    <div className={styles.course_not_found}>
                        <p>Не найдены активные курсы</p>
                        <p>перейдите в настройки</p>
                    </div>
                </div>
            </div>
        </>
    }

    return (
        <div className={styles.tasks_block}>
            <div className={styles.tasks_block_cover}>

                <div className={styles.block_header}>
                    <div className={styles.title}>{course.course_name}</div>
                    {isMobile
                        &&
                        <div
                            className={styles.to_courses}
                            onClick={mobileMove.openCourseList}
                        >
                            Перейти к курсам
                        </div>
                    }
                </div>


                <div className={styles.task_list}>
                    {
                        course.tasks.map((i, index) => <Task key={`t${index}`}
                                                             index={index + 1}
                                                             task={i}
                                                             size={course.tasks.length}
                                                             toDuty={() => toDuty({
                                                                 courseIndex: activeCourseIndex,
                                                                 taskIndex: index
                                                             })}
                        />)
                    }
                </div>
            </div>

            <TaskListMaterialsBlock
                materials={course.courseMaterials}
                isEmpty={!course.tasks.length}
                isOpen={isOpenMaterials}
                open={() => setIsOpenMaterials(true)}
            />


        </div>
    );
});

export default TaskList;