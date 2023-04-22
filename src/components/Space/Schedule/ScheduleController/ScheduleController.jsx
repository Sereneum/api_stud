import React, {useState} from 'react';
import SchSearch from "./SchSearch";
import SchDateSelector from "./SchDateSelector";
import styles from './ScheduleController.module.css'
import SchCalendar from "./SchCalendar";

const ScheduleController = () => {

    const [isVisible, setIsVisible] = useState(true)
    const modalControl = () => {
        setIsVisible(!isVisible)
    }

    return (
        <div className={styles.controller}>
            <SchDateSelector modalControl={modalControl} isVisible={isVisible} />
            <SchSearch />
            <SchCalendar isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
};

export default ScheduleController;