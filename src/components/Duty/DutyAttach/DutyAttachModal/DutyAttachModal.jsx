import React from 'react';
import styles from './DutyAttachModal.module.css'
import close_icon from '../../../../resources/duty/close.svg'
import attach_icon from '../../../../resources/duty/attach.svg'
import upload_icon from '../../../../resources/duty/upload_icon.svg'

const DutyAttachModal = ({setModal}) => {


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

            <div className={styles.modal_attach_block}>
                <img
                    alt=""
                    src={upload_icon}
                    className={styles.modal_upload_icon}
                />
            </div>
            <div className={styles.modal_submit}>
                добавить
            </div>
        </div>
    );
};

export default DutyAttachModal;