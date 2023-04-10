import React from 'react';
import styles from './DeadlineList.module.css'
import {observer} from "mobx-react-lite";
import DeadlineItem from "./DeadlineItem";
import {useMediaQuery} from "react-responsive";

const DeadlineList = observer(({tasks, desktopMove, courses, mobileMove}) => {

    const isMobile = useMediaQuery({query: '(max-width: 1000px)'})

    const findIndexes = (course_id, courseTaskID) => {
        let courseIndex = -1
        let taskIndex = -1

        for (let i = 0; i < courses.length; ++i)
            if (courses[i].course_id === course_id)
                courseIndex = i

        for (let i = 0; i < courses[courseIndex].tasks.length; ++i)
            if (courses[courseIndex].tasks[i].courseTaskID === courseTaskID)
                taskIndex = i

        return {courseIndex, taskIndex}
    }

    const toDuty = (indexes) => {
        isMobile
            ?
            mobileMove.openDuty(indexes)
            :
            desktopMove.openDuty(indexes)
    }

    return (
        <div className={styles.deadline_block}>
            <div className={styles.title}>Ближайшие дедлайны</div>
            <div className={styles.deadline_list}>
                {tasks.map((i, index) => <DeadlineItem
                    key={`dl${i.courseTaskID}`}
                    task={i}
                    isLast={tasks.length === index + 1}
                    toDuty={toDuty}
                    findIndexes={findIndexes}
                />)}
            </div>
        </div>
    );
});

export default DeadlineList;