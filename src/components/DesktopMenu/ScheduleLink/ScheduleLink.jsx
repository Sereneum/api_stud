import React, {useContext, useEffect, useState} from 'react';
import styles from './ScheduleLink.module.css'
import schedule_icon from "../../../resources/schedule_icon.svg";
import {Context} from "../../../index";

const ScheduleLink = () => {
    const id = 'scheduleLink'
    const { binder } = useContext(Context)
    const [func, setFunc] = useState(null)

    const scheduleRequest = () => {
        binder.getFunc(id) && binder.getFunc(id)()
    }

    return (
        <div className={styles.block} onClick={scheduleRequest}>
            <img className={styles.icon} src={schedule_icon} alt=""/>
            <span className={styles.text}>Расписание</span>
        </div>
    );
};

export default ScheduleLink;