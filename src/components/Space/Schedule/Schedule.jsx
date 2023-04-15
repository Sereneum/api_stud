import React, {useEffect, useState} from 'react';
import styles from './Schedule.module.css'
import {epoch_schedule} from "../../../epoch/epochServer";
import ScheduleLesson from "./ScheduleLesson";
import {sch_parser} from "./schedule_parser";
import Spin from "../../Spin";
import ScheduleDay from "./ScheduleDay";


const Schedule = () => {

    const [lessons, setLessons] = useState(null)
    const [week, setWeek] = useState(null)

    useEffect(() => {
        epoch_schedule().then(r => {
            setLessons(r.rasp)
            setWeek(sch_parser(r.rasp))
        })
    }, [])

    // if(!lessons) return <

    return (
        <div className={styles.block}>
            <div className={styles.title}>Расписание</div>
            {
                !week
                    ?
                    <Spin cl={styles.spinner}/>
                    :
                    <>
                        {/*<div className={styles.day}>*/}

                        {/*</div>*/}

                        <div>
                            {
                                week.map(i => <ScheduleDay key={i.dayIndex} day={i}/>)
                            }
                        </div>

                        {/*{lessons && <ScheduleLesson  lesson={lessons[20]}/>}*/}
                    </>

            }
        </div>
    );
};

export default Schedule;