import React, {useContext, useEffect, useState} from 'react';
import styles from './Duty.module.css'
import back from '../../resources/back.svg'
import teacher_icon from '../../resources/teacher.svg'
import date_icon from '../../resources/date.svg'
import status_icon from '../../resources/status.svg'
import file_icon from '../../resources/file.svg'
import notation_icon from '../../resources/note.svg'
import mark_icon from '../../resources/mark.svg'

import DutyFilesList from "./DutyFilesList";
import DutyDesc from "./DutyDesc";
import {preEpoch_getDetailTaskData} from "../../epoch/preEpoch";
import Spin from "../Spin";
import DutyAttach from "./DutyAttach/DutyAttach";
import {Context} from "../../index";
import {useMediaQuery} from "react-responsive";


const Duty = ({dutyActive, mobileMove, desktopMove}) => {

    const {course} = useContext(Context)
    const isMobile = useMediaQuery({query: '(max-width: 1300px)'})

    const valueActiveCourse = course.courses[dutyActive.courseIndex]
    const task = valueActiveCourse.tasks[dutyActive.taskIndex]

    const [detailTaskData, setDetailTaskData] = useState({})
    const [loading, setLoading] = useState(true)
    const [sendData, setSendData] = useState({})

    useEffect(() => {
        setLoading(true)
        loadingTaskData()
    }, [dutyActive])


    const dataConv = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${day}.${month}.${year}`
    }

    const localDeadline = (birth, final) => {
        let comp = `${dataConv(birth)} - ${dataConv(final)}`
        let hours = (Date.parse(final) - Date.now()) / (1000 * 60 * 60) + 24
        hours = hours < 0 ? 0 : Math.round(hours)
        let str = ''
        if (hours > 24) str = `Дней до закрытия: ${Math.round(hours / 24)}`
        else if (hours > 0) str = `Часов до закрытия: ${hours}`
        else str = ``

        return <> <span>{comp}</span>{str ? ' / ' : ''}<span style={{color: '#f08080cc'}}>{str}</span> </>
    }


    const statusComp = (st_id) => {
        let colors = ['lightslategrey', '#f08080cc', 'lightskyblue', 'lightgoldenrodyellow', 'lightgreen']
        if (st_id == null) return <span style={{color: `${colors[0]}`}}>{'Не отправлено'}</span>
        else return <span style={{color: `${colors[task.statusID]}`}}>{task.statusName}</span>
    }

    const markPusher = (mark) => {
        switch (mark) {
            case -1:
                return 'Незачёт'
            case 1:
                return 'Не явился'
            case 2:
                return 'Неудовлетворительно'
            case 3:
                return 'Удовлетворительно'
            case 4:
                return 'Хорошо'
            case 5:
                return 'Отлично'
            case 6:
                return 'Не изучал'
            case 7:
                return 'Зачёт'
        }
    }

    const taskFile = (s) => {
        try {
            return s.slice(s.lastIndexOf('\\') + 1)
        } catch (e) {
            return ''
        }
    }

    const loadingTaskData = () => {
        preEpoch_getDetailTaskData(task.courseTaskID)
            .then(r => {
                setDetailTaskData(r)
                setLoading(false)

                setSendData({
                    studentID: r.studentID,
                    courseTaskID: r.courseTaskID,
                    courseStudentID: r.courseStudentID,
                })

                // console.log('task: ', task)
                // console.log('detailTaskData: ', r)
            })
    }



    // useEffect(() => {
    //     if(!loading)
    //         console.log(detailTaskData)
    // }, [loading])


    const toBack = () => {
        isMobile
            ?
            mobileMove.openCourse()
            :
            desktopMove.openCourse()

    }

    return (
        <div className={styles.duty_main_block}>
            {
                loading
                    ?
                    <Spin cl={styles.spinner}/>
                    :
                    <>
                        <div className={styles.duty_desc_block_cover}>
                            <div className={styles.duty_nav} onClick={toBack}>
                                <img
                                    alt=""
                                    src={back}
                                    className={styles.duty_back}/>
                                <div className={styles.duty_title}>{task.nameTask}</div>
                            </div>


                            <>

                                {task.taskFile
                                    ?
                                    <div className={styles.duty_desc_block} style={{cursor: 'pointer'}}>
                                        <img alt="" src={file_icon} className={styles.duty_desc_icon}/>
                                        <a
                                            href={
                                                `https://stud.mgri.ru/api/ElectronicEducation/Files/downloadTaskFile?taskID=${task.courseTaskID}`
                                            }
                                            className={styles.duty_desc_text}
                                            style={{color: "#6197E8", textDecoration: 'none'}}>
                                            {taskFile(task.taskFile)}
                                        </a>
                                    </div>
                                    :
                                    <></>
                                }
                                <DutyDesc icon={teacher_icon} text={task.userFIO}/>
                                <DutyDesc
                                    icon={date_icon}
                                    text={localDeadline(task.dateAdded, task.periodRealization)}
                                />
                                <DutyDesc
                                    icon={status_icon}
                                    text={statusComp(task.statusID)}
                                />
                                {detailTaskData.markID
                                    ?
                                    <DutyDesc
                                        icon={mark_icon}
                                        text={markPusher(detailTaskData.markID)}
                                    />
                                    :
                                    <></>
                                }
                                {detailTaskData.notation
                                    ?
                                    <DutyDesc
                                        icon={notation_icon}
                                        text={detailTaskData.notation}
                                    />
                                    :
                                    <></>
                                }

                            </>
                            <DutyAttach
                                files={detailTaskData.files}
                                task={task}
                                detail={detailTaskData}
                                sendData={sendData}
                                loadingTaskData={loadingTaskData}
                            />
                            <DutyFilesList files={valueActiveCourse.courseMaterials}/>
                        </div>
                    </>

            }
        </div>
    );
}

export default Duty;