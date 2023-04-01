import React, {useCallback} from 'react';
import styles from './DutyAttachModal.module.css'
import close_icon from '../../../../resources/duty/close.svg'
import attach_icon from '../../../../resources/duty/attach.svg'
import upload_icon from '../../../../resources/duty/upload_icon.svg'
import DutyAttachDropzone from "./DutyAttachDropzone";
import {epoch_uploadFile} from "../../../../epoch/epochServer";

const DutyAttachModal = ({setModal, sendData, courseID, loadingTaskData}) => {

    const uploading = (newFiles) => {
        const formData = new FormData()
        for(let file of newFiles)
            formData.append("newFiles", file)
        for(const key in sendData)
            formData.append(key, sendData[key])

        epoch_uploadFile({formData})
            .then(r => {
                console.log(r, courseID)
                loadingTaskData()
                setModal(false)
            })
    }



    return (
        <div className={styles.modal}>
            <img
                alt=""
                src={close_icon}
                className={styles.modal_close}
                onClick={setModal}
            />

            <div className={styles.modal_title}>
                <img alt="" src={attach_icon} className={styles.modal_title_icon}/>
                <div className={styles.modal_title_text}>Прикрепить решение</div>
            </div>


            <DutyAttachDropzone sendData={sendData} uploading={uploading}/>

            {/*className={styles.modal_attach_block}*/}
            {/*<img*/}
            {/*    alt=""*/}
            {/*    src={upload_icon}*/}
            {/*    className={styles.modal_upload_icon}*/}
            {/*/>*/}

            <div className={styles.modal_submit}>
                добавить
            </div>
        </div>
    );
};

export default DutyAttachModal;