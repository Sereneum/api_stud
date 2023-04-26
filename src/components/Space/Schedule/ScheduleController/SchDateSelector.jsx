import React, {useContext} from 'react';
import styles from './ScheduleController.module.css'
import sch_icon from "../../../../resources/schedule_icon.svg";
import show_icon from "../../../../resources/show_icon.svg";
import {parserDateNow, parserDateNowForSch} from "../../../../managers/parser";
import {Context} from "../../../../index";

const SchDateSelector = ({modalControl, isVisible}) => {

    const {schStore} = useContext(Context)
    const date = schStore.currentWeek ? parserDateNowForSch(schStore.currentWeek) :
        parserDateNowForSch()


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