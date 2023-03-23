import React from 'react';
import styles from "./DutyMaterials.module.css";
import DutyFile from "./DutyFile";

const DutyFilesList = ({files}) => {
    return (
       <div className={styles.duty_materials_block}>
           <div className={styles.duty_materials_title}>Материалы курса</div>
           <div className={styles.duty_materials_list}>
               {
                   files.map(i => <DutyFile key={i.fileID} file={i}/>)
               }
           </div>
       </div>
    );
};

export default DutyFilesList;