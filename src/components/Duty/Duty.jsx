import React, {useEffect, useState} from 'react';
import styles from './Duty.module.css'
import back from '../../resources/back.svg'
import teacher_icon from '../../resources/teacher.svg'
import date_icon from '../../resources/date.svg'
import status_icon from '../../resources/status.svg'
import file_icon from '../../resources/file.svg'
import DutyFilesList from "./DutyFilesList";
import DutyDesc from "./DutyDesc";

// {course_name, course_id, user_data, duty_data}
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
                <div className={styles.duty_title}>{full.course_name}</div>
            </div>

            <div className={styles.duty_deadline}>{`Выполнить до: ${dataConv(selectedTask.periodRealization)}`}</div>

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
                <DutyDesc icon={date_icon} text={dataConv(selectedTask.dateAdded)}/>
                <DutyDesc icon={status_icon} text={'Стутус'}/>
            </>


            <DutyFilesList files={files}/>
        </div>
    );
};

export default Duty;