import React, {useCallback, useState} from 'react';
import styles from './DutyAttachModal.module.css'
import close_icon from '../../../../resources/duty/close.svg'
import attach_icon from '../../../../resources/duty/attach.svg'
import upload_icon from '../../../../resources/duty/upload_icon.svg'
import DutyAttachDropzone from "./DutyAttachDropzone";
import {epoch_uploadFile} from "../../../../epoch/epochServer";
import {CSSTransition} from "react-transition-group";
import '../../../../cssAnimation/modal_animation.css'
import link from '../../../../resources/duty/link_icon.svg'

const DutyAttachModal = ({setModal, sendData, courseID, loadingTaskData, isModal}) => {

    const uploadingFiles = (newFiles) => {
        const formData = new FormData()
        for (let file of newFiles)
            formData.append("newFiles", file)
        for (const key in sendData)
            formData.append(key, sendData[key])

        epoch_uploadFile({formData})
            .then(r => {
                console.log(r, courseID)
                loadingTaskData()
                setModal(false)
            })
    }

    const uploadingLink = (name, url) => {
        if (!(inputUrl.length || inputName.length)) return
        const formData = new FormData()
        formData.append("link", url)
        formData.append("linkName", name)
        for (const key in sendData)
            formData.append(key, sendData[key])

        epoch_uploadFile({formData})
            .then(r => {
                console.log(r, courseID)
                loadingTaskData()
                setModal(false)
                setInputName('')
                setInputUrl('')
            })
    }


    const [inputName, setInputName] = useState('')
    const [inputUrl, setInputUrl] = useState('')
    // style={{display: isModal ? '' : 'none'}}
    return (
    <div className={styles.modal_wrapper}>

        <CSSTransition in={isModal} timeout={1000} classNames={'blur'} mountOnEnter>
            <div className={styles.modal_bg} onClick={setModal}></div>
        </CSSTransition>

        <CSSTransition in={isModal} timeout={700} classNames={'modal-animation'} mountOnEnter>
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


                <DutyAttachDropzone sendData={sendData} uploading={uploadingFiles} isModal={isModal}/>

                <div className={styles.url_block}>
                    <div className={styles.url_title}>
                        <img alt="" src={link} className={styles.link_icon}/>
                        <div className={styles.link_title_text}>
                            Добавить ссылку
                        </div>
                    </div>
                    <input
                        className={styles.url_name}
                        placeholder='Наименование URL ссылки'
                        value={inputName}
                        onChange={e => setInputName(e.target.value)}
                    />
                    <input
                        placeholder='URL ссылка'
                        value={inputUrl}
                        onChange={e => setInputUrl(e.target.value)}
                    />

                    <div
                        className={styles.url_button}
                        onClick={() => uploadingLink(inputName, inputUrl)}
                    >
                        Добавить
                    </div>

                </div>


            </div>
        </CSSTransition>
        </div>



    );
};

export default DutyAttachModal;