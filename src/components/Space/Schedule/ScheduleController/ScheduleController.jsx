import React, {useState} from 'react';
import SchSearch from "./SchSearch";
import SchDateSelector from "./SchDateSelector";
import styles from './ScheduleController.module.css'
import SchCalendar from "./SchCalendar";
import {CSSTransition, Transition} from "react-transition-group";
import '../../../../cssAnimation/sch_controller_animation.css'

const ScheduleController = ({weekID, reLoadWeek}) => {

    const [isVisible, setIsVisible] = useState(true)
    const modalControl = () => {
        setIsVisible(!isVisible)
    }

    return (
        <div className={styles.controller}>
            <SchDateSelector modalControl={modalControl} isVisible={isVisible} />
            <SchSearch />
            <CSSTransition  in={isVisible} mountOnEnter timeout={1000} classNames={'my-node'}>
                <SchCalendar
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    weekID={weekID}
                    reLoadWeek={reLoadWeek}
                />
            </CSSTransition>




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