import React, {useEffect} from 'react';
import styles from './DeadlineList.module.css'

const DeadlineItem = ({task, isLast, toDuty, findIndexes}) => {


    const click = () => {
        let indexes = findIndexes(task.courseID, task.courseTaskID)
        toDuty(indexes)
    }

    const timeParser = (hours) => {
        let days = hours / 24
        if(days >= 1) return `Дней до закрытия: ${Math.round(hours / 24)}`
        else return `Часов до закрытия: ${(hours)}`
    }

    return (
       <div>
           <div className={styles.deadline_item} onClick={click}>
               <div className={styles.dl_item_course_name}>{task.courseName}</div>
               <div className={styles.dl_item_task_name}>{task.nameTask}</div>
               <div className={styles.dl_item_timer}>{timeParser(task.deadline)}</div>
           </div>
           {isLast
               ? ''
               : <hr className={styles.hr}/>
           }
       </div>
    );
};

export default DeadlineItem;