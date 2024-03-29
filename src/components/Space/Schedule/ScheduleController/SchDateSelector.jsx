import React, {useContext} from 'react';
import styles from './ScheduleController.module.css'
import sch_icon from "../../../../resources/schedule_icon.svg";
import show_icon from "../../../../resources/show_icon.svg";
import {parserDateNowForSch} from "../../../../managers/parser";
import {Context} from "../../../../index";
import {CSSTransition} from "react-transition-group";
import '../../../../cssAnimation/arrow_animation.css'

const SchDateSelector = ({modalControl, isVisible, setIsVisible}) => {

    const {schStore} = useContext(Context)
    const date = schStore.currentWeek ? parserDateNowForSch(schStore.currentWeek) :
        parserDateNowForSch()


    return (
        <div className={styles.block + ' ' + styles.date_selector} onClick={modalControl}>
            <img src={sch_icon} alt="" className={styles.icon}/>
            <div className={styles.text}>{date}</div>
            <CSSTransition
                timeout={1000}
                in={isVisible}
                classNames={'arrow-animation'}
            >
                <img
                    src={show_icon}
                    alt=""
                    className={`${styles.last_icon} `}
                    onClick={() => setIsVisible(prev => !prev)}
                />
            </CSSTransition>
        </div>
    );
};

export default SchDateSelector;