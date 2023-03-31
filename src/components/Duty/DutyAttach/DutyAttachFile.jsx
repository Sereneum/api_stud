import React from 'react';
import styles from './DutyAttach.module.css'

const DutyAttachFile = ({file}) => {
    return (
        <div className={styles.duty_attach_file}>
            {file.nameFile}
        </div>
    );
};

export default DutyAttachFile;