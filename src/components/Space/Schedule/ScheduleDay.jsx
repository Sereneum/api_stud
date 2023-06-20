import React from 'react';
import styles from './Schedule.module.css'
import ScheduleLesson from "./ScheduleLesson";
import stl from './ScheduleSpace.module.css'


const ScheduleDay = ({day}) => {
    return (
        <div className={stl.day}>


            <div className={stl.date_container}>
                <p>{day.day}</p>
                <p className={stl.date}>{day.date}</p>
            </div>

            <div className={stl.lesson_container}>
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