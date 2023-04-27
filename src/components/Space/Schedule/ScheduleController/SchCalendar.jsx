import React, {useContext, useEffect, useState} from 'react';
import styles from './ScheduleController.module.css'
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import {inValidDate, toMonth} from "./calendar_manager";
import {parserDateNow} from "../../../../managers/parser";
import show_icon from "../../../../resources/show_icon.svg";
import {CSSTransition} from "react-transition-group";
import '../../../../cssAnimation/sch_controller_animation.css'

const SchCalendar = observer(({isVisible, setIsVisible, weekID, reLoadWeek}) => {

    const {schStore} = useContext(Context)
    const validDate = inValidDate(weekID)
    const [year, setYear] = useState(validDate.getFullYear())
    const [month, setMonth] = useState(validDate.getMonth())

    const fillTable = (calendar) => {
        // console.log(calendar)
        let firstDay = new Date(year, month, 1).getDay()
        let offset = firstDay === 0 ? 6 : firstDay - 1
        let value = 0
        let mx = 31

        const isNow = (d1, d2) =>
            d1.getFullYear() === d2.getFullYear()
            &&
            d1.getMonth() === d2.getMonth()
            &&
            d1.getDate() === d2.getDate()


        const table = []
        for (let i = 0; i < 5; ++i) {
            table.push([])
            for (let j = 0; j < 7; ++j) {
                let cur = (i * 5 + j)
                if (!(cur >= offset && value <= mx)) {
                    table[i].push('')
                    continue
                }
                let createDayData = parserDateNow(new Date(year, month, ++value))
                let isOk = calendar.dates.indexOf(createDayData) !== -1

                table[i].push(
                    {
                        value,
                        isOk,
                        strDate: createDayData,
                        normalDate: new Date(year, month, value),
                        isNow: isNow(validDate, new Date(year, month, value))
                    },
                )
            }
        }

        return table
    }

    const [table, setTable] = useState([])

    useEffect(() => {

        if (schStore.calendar
            &&
            Object.entries(schStore.calendar).length) {
            setTable(fillTable(schStore.calendar))
        }
    }, [schStore.calendar, schStore.currentWeek, month, year])

    const click = (obj) => {
        reLoadWeek(parserDateNow(obj.normalDate))
        setIsVisible(false)
    }

    const previousMonth = () => {
        let minDate = new Date(schStore.calendar.minDate)
        let new_month = month - 1 < 0 ? 12 : month - 1
        let new_year = month - 1 < 0 ? year - 1 : year
        let new_date = new Date(new_year, new_month, 1)


        return minDate.getMonth() <= new_date.getMonth()
    }

    const nextMonth = () => {
        let maxDate = new Date(schStore.calendar.maxDate)
        let new_month = month + 1 > 12 ? 0 : month + 1
        let new_year = month + 1 > 12 ? year + 1 : year
        let new_date = new Date(new_year, new_month, 1)

        return maxDate.getMonth() >= new_date.getMonth()
    }

    const clickOnArrow = (offset) => {
        setMonth(month + offset)
    }


    return (
        <CSSTransition in={isVisible} timeout={1000} classNames={'my-node'} mountOnEnter>
            <div
                className={styles.calendar}
                // style={{display: isVisible ? '' : 'none'}}
            >
                <div className={styles.head}>
                    <img
                        src={show_icon}
                        alt=""
                        className={`${styles.arrow} ${!previousMonth() && styles.passiveArrow}`}
                        style={{rotate: '90deg'}}
                        onClick={() => {
                            previousMonth() && clickOnArrow(-1)
                        }}
                    />
                    <div>
                        {`${toMonth(month)} ${year}г.`}
                    </div>
                    <img
                        src={show_icon}
                        alt=""
                        className={`${styles.arrow} ${!nextMonth() && styles.passiveArrow}`}
                        style={{rotate: '270deg'}}
                        onClick={() => {
                            nextMonth() && clickOnArrow(+1)
                        }}
                    />
                </div>

                {table.length
                    &&
                    <table>
                        <thead>
                        <tr>
                            {['П', 'В', 'С', 'Ч', 'П', 'С', 'В']
                                .map((i, ind) => <th key={i + ind}>{i}</th>)}
                        </tr>
                        </thead>

                        <tbody>
                        {
                            table.map(
                                (rows, rowIndex) => <tr key={`r${rowIndex}`}>
                                    {rows.map(
                                        (colm, colmIndex) =>
                                            <td
                                                key={`c${rowIndex * 7 + colmIndex}`}
                                                className={
                                                    `${colm.isNow ? styles.isNow : colm.isOk ? styles.isOk : ''}`
                                                }
                                                onClick={() => click(colm)}
                                            >
                                                {colm.value}
                                            </td>
                                    )}
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                }
            </div>
        </CSSTransition>
    );
});

export default SchCalendar;