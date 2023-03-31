import React from 'react';
import styles from './DutyAttach.module.css'
import add_icon from '../../../resources/duty/add.svg'

const DutyAttachAddButton = ({setModal}) => {


    return (
        <div className={styles.duty_attach_file} onClick={setModal}>
            <img
                alt=""
                src={add_icon}
                className={styles.duty_attach_add_icon}
            />
        </div>
    );
};

export default DutyAttachAddButton;