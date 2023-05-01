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
import {parserDateNow, parserDateNowForSch} from "../../../managers/parser";


const Schedule = observer(({weekID}) => {

    const [lessons, setLessons] = useState(null)
    const [week, setWeek] = useState(null)
    const [reloading, setReloading] = useState(false)
    const [isCalendar, setIsCalendar] = useState(false)

    const {user, schStore} = useContext(Context)

    useEffect(() => {
        loadWeek().then()
    }, [])

    const loadWeek = (weekID = null) => new Promise((resolve, reject) => {
        epoch_schedule({
            groupID: user.detailed.group.item2,
            weekID: weekID ? weekID : null,
            isCalendar: schStore.calendar
                &&
                Object.entries(schStore.calendar).length
                &&
                true
        })
            .then(r => {
                setLessons(r[0].rasp)
                setWeek(sch_parser(r[0].rasp, weekID))
                r.length > 1 && schStore.setCalendar(r[1])
                schStore.setCurrentWeek(
                    weekID ? weekID : parserDateNow()
                )
                resolve(true)
            })
    })

    const reLoadWeek = (weekID) => {
        // console.log(`reLoadWeek => ${weekID}`)
        if (weekID === schStore.currentWeek) return
        setReloading(true)
        loadWeek(weekID).then(r => setReloading(false))
    }

    return (
        <div className={styles.block}>
            <div className={styles.title}>Расписание</div>

            {
                !week || reloading
                    ?
                    <Spin cl={styles.spinner}/>
                    :
                    <>
                        {
                            schStore.calendar
                            &&
                            Object.entries(schStore.calendar).length
                            &&
                            <ScheduleController
                                weekID={schStore.currentWeek ? schStore.currentWeek : parserDateNowForSch()}
                                reLoadWeek={reLoadWeek}
                            />
                        }
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