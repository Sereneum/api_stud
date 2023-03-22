import React, {useEffect, useState} from 'react';
import styles from './Duty.module.css'
import {getDataDuty} from "../../http/studAPI";
import Spin from "../Spin";


const Duty = () => {


    const [loader, setLoader] = useState(true)
    const [localDuty, setLocalDuty] = useState({})
    let course_id = 8997

    useEffect(() => {
        getDataDuty({course_id}).then(d => {
            console.log(d)
            setLocalDuty(d)
            setLoader(false)
        })
    }, [])


    return (
        <div className={styles.duty_main_block}>
            {loader
                ?
                <Spin cl={styles.duty_loader}/>
                :
                <>
                    <div className={styles.duty_title}>Название курса</div>
                    <div className={styles.duty_files}></div>
                </>
            }
        </div>
    );
};

export default Duty;