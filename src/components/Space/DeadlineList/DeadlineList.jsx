import React from 'react';
import styles from './DeadlineList.module.css'
import {observer} from "mobx-react-lite";
import DeadlineItem from "./DeadlineItem";

const DeadlineList = observer(({tasks}) => {
    return (
        <div className={styles.deadline_block}>
            <div className={styles.title}>Ближайшие дедлайны</div>
            <div className={styles.deadline_list}>
                {tasks.map((i, index) => <DeadlineItem key={i.taskID} task={i} isLast={tasks.length == index + 1}/>)}
            </div>
        </div>
    );
});

export default DeadlineList;