import React, {useEffect} from 'react';
import styles from './Schedule.module.css'
import lesson_icon from '../../../resources/schedule_lesson/sch_lesson_icon.svg'
import teacher_icon from '../../../resources/schedule_lesson/sch_teacher_icon.svg'
import audience_icon from '../../../resources/schedule_lesson/sch_audience_icon.svg'
import stl from './ScheduleSpace.module.css'

import { GraduationCap, MapPin} from "@phosphor-icons/react";

const ScheduleLesson = ({lesson}) => {


    const typeStyle = (les) => {
        if (les.length > 3 && les.slice(0, 3) === 'лек')
            return stl.lesson_time_element_lec
        if (les.length > 3 && les.slice(0, 3) === 'пр.')
            return stl.lesson_time_element_pract
        if (les.length > 3 && les.slice(0, 3) === 'лаб')
            return stl.lesson_time_element_lab
        if (les.length > 3 && les.slice(0, 3) === 'экз')
            return stl.lesson_time_element_exam
    }



    const activeStyle = () => {

        let date = new Date()
        if (
            lesson['деньНедели'] === date.getDay()
            &&
            date.getTime() >= Date.parse(lesson['датаНачала'])
            &&
            date.getTime() <= Date.parse(lesson['датаОкончания'])
        ) return true
        else
            return false
    }


    const lessonName = lesson['дисциплина']
    const begin = lesson['датаНачала'].split('T')[1].slice(0, -3)
    const end = lesson['датаОкончания'].split('T')[1].slice(0, -3)
    const teacher = lesson['преподаватель']
    const audience = lesson['аудитория']

    const isNow = activeStyle()

    return (
        <div className={stl.lesson}>

            <div className={stl.lesson_time_container}>
                <div className={`${typeStyle(lessonName)}`}>
                    <p className={stl.lesson_time}>{`${begin} - ${end}`}</p>
                </div>
                <div className={stl.lesson_active} style={{display: isNow ? "" : "none"}} ></div>
            </div>


            <p>{lessonName}</p>

            <div className={stl.lesson_info}>
                <div className={stl.lesson_info_container}>
                    <GraduationCap weight="bold" className={stl.icon}/>
                    <p className={stl.lesson_info_text}>{teacher}</p>
                </div>
                <div className={stl.lesson_info_container}>
                    <MapPin weight="bold" className={stl.icon}/>
                    <p className={stl.lesson_info_text}>{audience}</p>
                </div>
            </div>
            <div className="breaker"></div>
        </div>
    );
};

export default ScheduleLesson;