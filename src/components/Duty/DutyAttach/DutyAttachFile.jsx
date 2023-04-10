import React, {useEffect, useState} from 'react';
import styles from './DutyAttach.module.css'
import {assignorIcon, assignorIconDownload, handleDownload} from "../../../managers/files_manager";
import {useFileManager} from "../../../managers/useFileManager";


const DutyAttachFile = ({file, deleteFile, isSuccess}) => {


    const {icon, download} = useFileManager({file})


    return (
        <div className={styles.duty_attach_file}>
            <div className={styles.duty_attach_download_file} onClick={download}>
                <img
                    alt=""
                    className={styles.duty_attach_file_icon}
                    src={icon}
                />
                <div className={styles.duty_attach_file_name}>
                    {file.nameFile ? file.nameFile : file.nameLink ? file.nameLink : 'Безымянная ссылка'}
                </div>
            </div>
            <div className={styles.duty_attach_breaker}></div>
            <div
                className={`${styles.duty_attach_delete} ${isSuccess && styles.taboo}`}
                onClick={() => {
                    if(!isSuccess) deleteFile(file.fileID)
                }}
            >
                Удалить
            </div>

        </div>
    );
}


export default DutyAttachFile;