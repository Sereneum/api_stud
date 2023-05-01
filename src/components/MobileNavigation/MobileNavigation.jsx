import React from 'react';
import styles from './MobileNavigation.module.css'
import settings_icon from "../../resources/mobnav/settings_white.svg";
import courses_icon from "../../resources/mobnav/courses.svg";
import deadlines_icon from "../../resources/mobnav/deadlines.svg";
import schedule_icon from '../../resources/schedule_icon.svg'
import menu_icon from '../../resources/menu_icon.svg'


const MobileNavigation = ({mobileMove, mobileMode}) => {

    const toCourse = () => {
        mobileMove.openCourseList()
    }

    const toDeadlines = () => {
        mobileMove.openDeadlines()
    }

    const toSchedule = () => {
        mobileMove.openSchedule()
    }

    const toMenu = () => {
        mobileMove.openMenu()
    }

    // const

    const isActive = (mode) => {
        return mobileMode === mode
            ?
            styles.active
            :
            ''
    }

    return (
        <div className={styles.bar}>

            <div
                className={`${styles.block} ${isActive('courses')}`}
                onClick={toCourse}
            >
                <img
                    alt=""
                    src={courses_icon}
                    className={`${styles.icon} ${isActive('courses')}`}/>
                <div
                    className={`${styles.title} ${isActive('courses')}`}
                >
                    Курсы
                </div>
            </div>

            <div
                className={`${styles.block} ${isActive('schedule')}`}
                onClick={toSchedule}
            >
                <img
                    alt=""
                    src={schedule_icon}
                    className={`${styles.icon_schedule} ${isActive('schedule')}`}/>
                <div
                    className={`${styles.title} ${isActive('schedule')}`}
                >
                    Расписание
                </div>
            </div>

            <div
                className={`${styles.block} ${isActive('deadlines')}`}
                onClick={toDeadlines}
            >
                <img
                    alt=""
                    src={deadlines_icon}
                    className={`${styles.icon} ${isActive('deadlines')}`}/>
                <div
                    className={`${styles.title} ${isActive('deadlines')}`}
                >
                    Дедлайны
                </div>
            </div>

            <div
                className={`${styles.block} ${isActive('menu')}`}
                onClick={toMenu}
            >
                <img
                    alt=""
                    src={menu_icon}
                    className={`${styles.icon_schedule} ${isActive('menu')}`}/>
                <div
                    className={`${styles.title} ${isActive('menu')}`}
                >
                    Меню
                </div>
            </div>

        </div>
    );
};

export default MobileNavigation;