import React from 'react';
import styles from './Duty.module.css'

const DutyFile = ({file}) => {

    return (
        <div className={styles.duty_file}>
            <div className={styles.duty_file_icon}></div>
            {/*<div className={styles.duty_file_signature}>{file.nameFile}</div>*/}
           <div className={styles.duty_file_signature}>
               <a
                   href={
                       `https://stud.mgri.ru${file.link}`
                   }
                   download
                   style={{color: "#6197E8", textDecoration: 'none'}}>
                   {file.nameFile}
               </a>
           </div>
        </div>
    );
};

export default DutyFile;