import React, {useEffect, useState} from 'react';
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

    const assignorIconDownload = () => {
        if (!file.nameFile) return link_open
        else {
            if (file.nameFile.slice(file.nameFile.lastIndexOf('.') + 1) == 'pdf')
                return link_open
            else
                return download_icon
        }
    }

    const assignorIcon = () => {
        if (!file.nameFile) return link_icon
        let format = file.nameFile.slice(file.nameFile.lastIndexOf('.') + 1)

        switch (format) {
            case 'xlsx':
                return excel_file
            case 'xls':
                return excel_file
            case 'docx':
                return word_file
            case 'pdf':
                return pdf_file
            case 'pptx':
                return pptx_file
            case 'zip':
                return zip_file
            case 'png':
                return picture_file
            case 'jpg':
                return picture_file
            default:
                return unknown_file
        }
    }

    const handleDownload = () => {
        let url = file.nameFile ? `https://stud.mgri.ru${file.link}` : file.link
        if (url.slice(url.lastIndexOf('.') + 1) == 'pdf')
            window.open(url, '_blank')
        else if (file.nameFile)
            window.location.href = url
        else
            window.open(url)
    };

    const [icon, setIcon] = useState(null)
    const [downloadIcon, setDownloadIcon] = useState(null)

    useEffect(() => {
        setIcon(() => assignorIcon())
        setDownloadIcon(() => assignorIconDownload())
    }, [])


    return (
        <div className={styles.duty_materials_item}>
            <img alt="" src={icon} className={styles.duty_materials_icon}/>
            <div className={styles.duty_materials_file_name}>
                {file.nameFile ? file.nameFile : file.nameLink}
            </div>
            {/*<img alt="" src={preview_icon} className={styles.duty_materials_preview_button}/>*/}
            <img
                alt=""
                src={downloadIcon}
                className={styles.duty_materials_download_button}
                onClick={handleDownload}
            />
        </div>
    );
};

export default DutyFile;
