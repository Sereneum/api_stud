import React, {useEffect, useState} from 'react';
import styles from './DutyMaterials.module.css'
import {assignorIcon, assignorIconDownload, handleDownload} from "../../managers/files_manager";
import {useFileManager} from "../../managers/useFileManager";


const DutyFile = ({file}) => {

    const {icon, downloadIcon, download} = useFileManager({file})


    return (
        <div className={styles.duty_materials_item}>
            <img alt="" src={icon} className={styles.duty_materials_icon}/>
            <div className={styles.duty_materials_file_name}>
                {file.nameFile ? file.nameFile : file.nameLink ? file.nameLink : 'Безымянная ссылка'}
            </div>
            {/*<img alt="" src={preview_icon} className={styles.duty_materials_preview_button}/>*/}
            <img
                alt=""
                src={downloadIcon}
                className={styles.duty_materials_download_button}
                onClick={download}
            />
        </div>
    );
};

export default DutyFile;
