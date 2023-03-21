import React from 'react';
import styles from "./Duty.module.css";
import DutyFile from "./DutyFile";

const DutyFilesList = ({files}) => {
    return (
       <div className={styles.duty_title}>
           <div>Файлы курса</div>
           <div className={styles.duty_files_list}>
               {
                   files.map(i => <DutyFile key={i.fileID} file={i}/>)
               }
           </div>
       </div>
    );
};

export default DutyFilesList;