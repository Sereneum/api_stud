import React, {useEffect} from 'react';
import styles from './Schedule.module.css'
import lesson_icon from '../../../resources/schedule_lesson/sch_lesson_icon.svg'
import teacher_icon from '../../../resources/schedule_lesson/sch_teacher_icon.svg'
import audience_icon from '../../../resources/schedule_lesson/sch_audience_icon.svg'

const ScheduleLesson = ({lesson}) => {

    useEffect(() => {
        // console.log(lesson)
    }, [])


    const typeStyle = (les) => {
        if (les.length > 3 && les.slice(0, 3) === 'лек')
            return styles.lecture
        if (les.length > 3 && les.slice(0, 3) === 'пр.')
            return styles.practice
        if (les.length > 3 && les.slice(0, 3) === 'лаб')
            return styles.laboratory
    }

    const activeStyle = () => {
        let date = new Date(2023, 3, 17, 12)
        if (
            lesson['деньНедели'] === date.getDay()
            &&
            date.getTime() >= Date.parse(lesson['датаНачала'])
            &&
            date.getTime() <= Date.parse(lesson['датаОкончания'])
        ) return true
        else
            return false
        // let b = lesson['датаНачала']
        // let e = lesson['датаОкончания']
        //
        // if(date.getTime() >= Date.parse(b) && date.getTime() <= Date.parse(e))
        //     return
    }


    const lessonName = lesson['дисциплина']
    const begin = lesson['датаНачала'].split('T')[1].slice(0, -3)
    const end = lesson['датаОкончания'].split('T')[1].slice(0, -3)
    const teacher = lesson['преподаватель']
    const audience = lesson['аудитория']

    const isNow = activeStyle()


    return (
        <div className={`${styles.lesson_block} ${typeStyle(lessonName)} ${isNow && styles.now}`}>
            {isNow && <div className={styles.now_point}></div>}
            <div className={styles.lesson_date_block}>
                <span className={styles.lesson_date}>{begin}</span>
                <div className={styles.hor_hr}></div>
                <span className={styles.lesson_date}>{end}</span>
            </div>

            <div className={styles.ver_hr}></div>

            <div className={styles.lesson_description_block}>
                <div className={styles.lesson}>
                    <img src={lesson_icon} alt=""/>
                    <div>{lessonName}</div>
                </div>

                <div className={styles.lesson + ' ' + styles.secondary}>
                    <img src={teacher_icon} alt=""/>
                    <div>{teacher}</div>
                </div>

                <div className={styles.lesson + ' ' + styles.secondary}>
                    <img src={audience_icon} alt=""/>
                    <div>{audience}</div>
                </div>

            </div>

        </div>
    );
};

export default ScheduleLesson;