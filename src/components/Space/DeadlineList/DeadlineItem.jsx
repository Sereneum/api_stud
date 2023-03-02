import React from 'react';
import styles from './DeadlineList.module.css'

const DeadlineItem = ({task, isLast}) => {


    const timeParser = (hours) => {
        let days = hours / 24
        if(days >= 1) return `Дней до закрытия: ${Math.round(hours / 24)}`
        else return `Часов до закрытия: ${(hours)}`
    }

    return (
       <div>
           <div className={styles.deadline_item}>
               <div className={styles.dl_item_course_name}>{task.course_name}</div>
               <div className={styles.dl_item_task_name}>{task.name}</div>
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