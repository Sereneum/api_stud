import React from 'react';
import styles from './ScheduleController.module.css'
import sch_icon from "../../../../resources/schedule_icon.svg";
import show_icon from "../../../../resources/show_icon.svg";
import {parserDateNow, parserDateNowForSch} from "../../../../managers/parser";

const SchDateSelector = ({modalControl, isVisible}) => {

    const date = parserDateNowForSch()

    return (
        <div className={styles.block + ' ' + styles.date_selector }>
            <img src={sch_icon} alt="" className={styles.icon}/>
            <div className={styles.text}>{date}</div>
            <img
                src={show_icon}
                alt=""
                className={`${styles.last_icon} ${isVisible && styles.show}`}
                onClick={modalControl}
            />
        </div>
    );
};

export default SchDateSelector;