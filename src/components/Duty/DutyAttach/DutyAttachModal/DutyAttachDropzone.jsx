import React, {useCallback} from 'react';
import styles from './DutyAttachModal.module.css'
import upload_icon from '../../../../resources/duty/upload_icon.svg'
import Dropzone, {useDropzone} from "react-dropzone";


const DutyAttachDropzone = ({sendData, uploading}) => {


    const onDrop = (acceptedFiles) => {
        uploading(acceptedFiles)
    }


    return (
        <Dropzone onDrop={onDrop}>
            {({getRootProps, getInputProps, onDropAccepted}) => (
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className={styles.modal_attach_block}>
                        <img
                            alt=""
                            src={upload_icon}
                            className={styles.modal_upload_icon}
                        />
                        <div className={styles.modal_note}>Выберите файл или перетащите его в это окно</div>
                        {/*{onDropAccepted && 'onDropAccepted'}*/}
                    </div>
                </div>
            )}
        </Dropzone>
    );
};

export default DutyAttachDropzone;