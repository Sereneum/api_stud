import React from 'react';
import styles from "./Duty.module.css";
import teacher from "../../resources/teacher.svg";

const DutyDesc = ({icon, text, mode=null}) => {


    return (
        <div className={styles.duty_desc_block}>
            <img alt="" src={icon} className={styles.duty_desc_icon}/>
            <div className={styles.duty_desc_text}>{text}</div>
        </div>
    );
};

export default DutyDesc;