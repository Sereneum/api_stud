import React, {useContext, useEffect, useState} from 'react';
import styles from './ScheduleController.module.css'
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";

const SchCalendar = observer(({isVisible, setIsVisible}) => {


    const {schStore} = useContext(Context)


    const fillTable = () => {
        let offset = 4
        let value = 1
        let mx = 31

        const table = []
        for (let i = 0; i < 5; ++i) {
            table.push([])
            for (let j = 0; j < 7; ++j) {
                let cur = (i * 5 + j)
                cur >= offset && value <= mx
                    ?
                    table[i].push(value++)
                    :
                    table[i].push('')
            }
        }

        return table
    }

    const [table, setTable] = useState([])
    useEffect(() => {
        setTable(fillTable())
        console.log('schStore.calendar')
        schStore.calendar && console.log(schStore.calendar)
    }, [schStore.calendar])

    return (
        <div
            className={styles.calendar}
            style={{display: isVisible ? '' : 'none'}}
        >
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
                                        <td key={`c${rowIndex * 7 + colmIndex}`}>{colm}</td>
                                )}
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            }
        </div>
    );
});

export default SchCalendar;