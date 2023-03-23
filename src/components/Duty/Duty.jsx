import React, {useEffect, useState} from 'react';
import styles from './Duty.module.css'
import back from '../../resources/back.svg'
import teacher_icon from '../../resources/teacher.svg'
import date_icon from '../../resources/date.svg'
import status_icon from '../../resources/status.svg'
import file_icon from '../../resources/file.svg'
import DutyFilesList from "./DutyFilesList";
import DutyDesc from "./DutyDesc";


const Duty = ({full, task_id, toBack}) => {

    let files = full.duty_data.listFiles
    let selectedTask = full.user_data.listSelectedTasks[task_id]

    const dataConv = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${day}.${month}.${year}`
    }

    const localDeadline = (birth, final) => {
        let comp = `${dataConv(selectedTask.dateAdded)} - ${dataConv(selectedTask.periodRealization)}`
        let hours = (Date.parse(final) - Date.now()) / (1000 * 60 * 60) + 24
        hours = hours < 0 ? 0 : Math.round(hours)
        let str = ''
        if(hours > 24) str = `Дней до закрытия: ${Math.round(hours / 24)}`
        else if(hours > 0) str = `Часов до закрытия: ${hours}`
        else str = ``

        return <> <span>{comp}</span>{str ? ' / ' : ''}<span style={{color: '#D17575'}}>{str}</span> </>
    }

    const statusComp = (st_id) => {
        let colors = ['lightslategrey', 'lightcoral', 'lightskyblue', 'lightgoldenrodyellow', 'lightgreen']
        if(st_id == null) return <span style={{color: `${colors[0]}`}}>{'Не отправлено'}</span>
        else return <span style={{color: `${colors[st_id]}`}}>{full.user_data.listStatus[st_id-1].statusName}</span>
    }


    const taskFile = (s) => {
        try {
            return s.slice(s.lastIndexOf('\\') + 1)
        } catch (e) {
            return ''
        }
    }

    useEffect(() => {
        console.log(full)
        console.log(selectedTask)
    })

    return (
        <div className={styles.duty_main_block}>
            <div className={styles.duty_nav}>
                <img
                    alt=""
                    src={back}
                    onClick={toBack}
                    className={styles.duty_back}/>
                <div className={styles.duty_title}>{selectedTask.nameTask}</div>
            </div>


            <>
                <div className={styles.duty_desc_block} style={{cursor: 'pointer'}}>
                    <img alt="" src={file_icon} className={styles.duty_desc_icon}/>
                    <a
                        href={
                            `https://stud.mgri.ru/api/ElectronicEducation/Files/downloadTaskFile?taskID=
                        ${selectedTask.courseTaskID}`
                        }
                        className={styles.duty_desc_text}
                        style={{color: "#6197E8", textDecoration: 'none'}}>
                        {taskFile(selectedTask.file)}
                    </a>
                </div>

                <DutyDesc icon={teacher_icon} text={selectedTask.userFIO}/>
                <DutyDesc
                    icon={date_icon}
                    text={localDeadline(selectedTask.dateAdded, selectedTask.periodRealization)}
                />
                <DutyDesc
                    icon={status_icon}
                    text={statusComp(selectedTask.taskExpired.statusID)}
                />
            </>


            <DutyFilesList files={files}/>
        </div>
    );
};

export default Duty;