import React, {useContext, useEffect, useState} from 'react';
import styles from './ScheduleLink.module.css'
import schedule_icon from "../../../resources/schedule_icon.svg";
import {Context} from "../../../index";

const ScheduleLink = () => {
    const id = 'scheduleLink'
    const { binder } = useContext(Context)
    const [func, setFunc] = useState(null)

    // useEffect(() => {
    //     binder.setSetter(id, setFunc)
    // }, [])

    const scheduleRequest = () => {
        console.log(binder.getFunc(id))
        binder.getFunc(id) && binder.getFunc(id)()
    }

    return (
        <div className={styles.block} onClick={scheduleRequest}>
            <img src={schedule_icon} alt=""/>
            <span className={styles.text}>Расписание</span>
        </div>
    );
};

export default ScheduleLink;