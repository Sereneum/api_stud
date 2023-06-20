import React, {useState} from 'react';
import SchSearch from "./SchSearch";
import SchDateSelector from "./SchDateSelector";
import styles from './ScheduleController.module.css'
import SchCalendar from "./SchCalendar";
import stl from '../ScheduleSpace.module.css'

const ScheduleController = ({weekID, reLoadWeek}) => {

    const [isVisible, setIsVisible] = useState(false)
    const modalControl = () => {
        setIsVisible(!isVisible)
    }

    // styles.controller
    return (
        <div className={styles.controller}>
            <SchDateSelector modalControl={modalControl} isVisible={isVisible} setIsVisible={setIsVisible}/>
                <SchCalendar
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    weekID={weekID}
                    reLoadWeek={reLoadWeek}
                />
        </div>
    );
};

export default ScheduleController;
