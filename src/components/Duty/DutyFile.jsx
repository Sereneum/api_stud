import React from 'react';
import styles from './DutyMaterials.module.css'


import download_icon from '../../resources/duty/download.svg'
import preview_icon from '../../resources/duty/view.svg'
import pdf_file from '../../resources/duty/pdf_file.svg'
import link_icon from '../../resources/duty/link_icon.svg'
import link_open from '../../resources/duty/link_open.svg'
import excel_file from '../../resources/duty/excel_file.svg'
import pptx_file from '../../resources/duty/pptx_file.svg'
import picture_file from '../../resources/duty/picture_file.svg'
import unknown_file from '../../resources/duty/unknown_file.svg'
import word_file from '../../resources/duty/word_file.svg'
import zip_file from '../../resources/duty/zip_file.svg'


const DutyFile = ({file}) => {

    const assignorIcon = () => {

    }

    const handleDownload = () => {
        let url = file.nameFile ? `https://stud.mgri.ru${file.link}` : file.link
        if (url.slice(url.lastIndexOf('.') + 1) == 'pdf')
            window.open(url, '_blank')
        else
            if(file.nameFile)
                window.location.href = url
            else
                window.open(url)
    };


    return (
        <div className={styles.duty_materials_item}>
            <img alt="" src={pdf_file} className={styles.duty_materials_icon}/>
            <div className={styles.duty_materials_file_name}>
                {file.nameFile ? file.nameFile : file.nameLink}
            </div>
            <img alt="" src={preview_icon} className={styles.duty_materials_preview_button}/>
            <img
                alt=""
                src={file.nameFile ? download_icon : link_open}
                className={styles.duty_materials_download_button}
                onClick={handleDownload}
            />
        </div>
    );
};

export default DutyFile;
