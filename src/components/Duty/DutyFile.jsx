import React from 'react';
import styles from './DutyMaterials.module.css'


import download_icon from '../../resources/duty/download.svg'
import preview_icon from '../../resources/duty/view.svg'
import pdf_file from '../../resources/duty/pdf_file.svg'
// import excel_file from '../../resources/duty/excel_file.svg'
// import pptx_file from '../../resources/duty/pptx_file.svg'
// import picture_file from '../../resources/duty/picture_file.svg'
// import unknown_file from '../../resources/duty/unknown_file.svg'
// import word_file from '../../resources/duty/word_file.svg'
// import zip_file from '../../resources/duty/zip_file.svg'


const DutyFile = ({file}) => {

    const assignorIcon = () => {

    }

    const handleDownload = () => {
        let url = `https://stud.mgri.ru${file.link}`
        if(url.slice(url.lastIndexOf('.') + 1) == 'pdf')
            window.open(url, '_blank')
        else
            window.location.href = url


        // if(isPdf) window.open(pdfUrl, '_blank');
        // else window.location.href = `https://stud.mgri.ru${file.link}`
    };


    return (
        <div className={styles.duty_materials_item}>
            <img alt="" src={pdf_file} className={styles.duty_materials_icon}/>
            <div className={styles.duty_materials_file_name}>{file.nameFile}</div>
            <img alt="" src={preview_icon} className={styles.duty_materials_preview_button}/>
            {/*<a href={`https://stud.mgri.ru${file.link}`} download>*/}
                <img
                    alt=""
                    src={download_icon}
                    className={styles.duty_materials_download_button}
                    onClick={handleDownload}
                />
            {/*</a>*/}

        </div>
    );
};

export default DutyFile;

{/*<a href={`https://stud.mgri.ru${file.link}`} download>*/
}
{/*    {file.nameFile}*/
}
{/*</a>*/
}