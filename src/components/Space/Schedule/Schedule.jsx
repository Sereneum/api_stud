import React, {useContext, useEffect, useState} from 'react';
import styles from './Schedule.module.css'
import {epoch_schedule} from "../../../epoch/epochServer";
import ScheduleLesson from "./ScheduleLesson";
import {sch_parser} from "./schedule_parser";
import Spin from "../../Spin";
import ScheduleDay from "./ScheduleDay";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import ScheduleController from "./ScheduleController/ScheduleController";


const Schedule = observer(({weekID}) => {

    const [lessons, setLessons] = useState(null)
    const [week, setWeek] = useState(null)

    const { user, schStore} = useContext(Context)

    useEffect(() => {
        epoch_schedule(user.detailed.group.item2, weekID).then(r => {
            setLessons(r[0].rasp)
            setWeek(sch_parser(r[0].rasp))
            schStore.setCalendar(r[1])
        })
    }, [])

    return (
        <div className={styles.block}>
            <div className={styles.title}>Расписание</div>
            <ScheduleController />
            {
                !week
                    ?
                    <Spin cl={styles.spinner}/>
                    :
                    <>
                        <div>
                            {
                                week.map(i => <ScheduleDay key={i.dayIndex} day={i}/>)
                            }
                        </div>
                    </>

            }
        </div>
    );
});

export default Schedule;