import React from 'react';
import styles from './Schedule.module.css'
import ScheduleLesson from "./ScheduleLesson";

const ScheduleDay = ({day}) => {
    return (
        <div className={styles.day}>
            <div className={styles.day_title}>
                <div>{day.day}</div>
                <div className={styles.day_date}>{day.date}</div>
            </div>

            <div>
                {
                    day.lessons.map(
                        i => <ScheduleLesson lesson={i} key={i['код']}/>
                    )
                }
            </div>

        </div>
    );
};

export default ScheduleDay;