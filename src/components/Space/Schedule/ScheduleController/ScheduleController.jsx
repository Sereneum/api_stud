import React, {useState} from 'react';
import SchSearch from "./SchSearch";
import SchDateSelector from "./SchDateSelector";
import styles from './ScheduleController.module.css'
import SchCalendar from "./SchCalendar";
import {CSSTransition, Transition} from "react-transition-group";

const ScheduleController = ({weekID, reLoadWeek}) => {

    const [isVisible, setIsVisible] = useState(false)
    const modalControl = () => {
        setIsVisible(!isVisible)
    }

    return (
        <div className={styles.controller}>
            <SchDateSelector modalControl={modalControl} isVisible={isVisible} setIsVisible={setIsVisible}/>
            {/* <SchSearch /> */}
            {/*<CSSTransition  in={isVisible} timeout={1000} classNames={'my-node'}>*/}
                <SchCalendar
                    className={styles.calendar_block}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    weekID={weekID}
                    reLoadWeek={reLoadWeek}
                />
            {/*</CSSTransition>*/}
        </div>
    );
};

export default ScheduleController;


// <SchCalendar
//     isVisible={isVisible}
//     setIsVisible={setIsVisible}
//     weekID={weekID}
//     reLoadWeek={reLoadWeek}
// />