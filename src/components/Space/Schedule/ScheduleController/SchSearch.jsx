import React, {useState} from 'react';
import styles from './ScheduleController.module.css'
import sch_search_icon from '../../../../resources/schedule_lesson/sch_search_icon.svg'

const SchSearch = () => {
    const [input, setInput] = useState('')

    return (
        <div className={styles.block}>
            <img src={sch_search_icon} alt="" className={styles.icon}/>
            <input
                placeholder='Поиск'
                value={input}
                onChange={e => setInput(e.target.value)}
                className={styles.input}
            />
            {/*<div className={styles.text}>Поиск</div>*/}
        </div>
    );
};

export default SchSearch;