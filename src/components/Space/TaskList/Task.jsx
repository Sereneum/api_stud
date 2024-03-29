import React, {useEffect} from 'react';
import '../Space.css'
import styles from './TaskList.module.css'

const Task = ({task, size, index, toDuty}) => {

    const styleStatus = status => {
        switch (status) {
            case 0: return {color: 'lightslategrey'}
            case 1: return {color: 'lightcoral', opacity: '0.75'}
            case 2: return {color: 'lightskyblue'}
            case 3: return {color: 'lightgoldenrodyellow'}
            case 4: return {color: 'lightgreen'}
        }
    }

    return (
        <div onClick={toDuty}>
            <div className={styles.task}>
                <div className={styles.task_name}>{`${index}. ${task.nameTask}`}</div>
                <div className={styles.status_name}>{'Статус: '} <span style={styleStatus(task.statusID)}>{task.statusName}</span></div>
            </div>
            {size === index ? '' : <hr className={styles.hr} />}
        </div>
    );
};

export default Task;