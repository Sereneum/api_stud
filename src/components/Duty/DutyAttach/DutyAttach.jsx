import React, {useEffect, useState} from 'react';
import styles from './DutyAttach.module.css'
import DutyAttachFile from "./DutyAttachFile";
import DutyAttachAddButton from "./DutyAttachAddButton";
import DutyAttachModal from "./DutyAttachModal/DutyAttachModal";
import {epoch_deleteFile} from "../../../epoch/epochServer";
import {CSSTransition} from "react-transition-group";
import '../../../cssAnimation/modal_animation.css'

const DutyAttach = ({files, task, detail, sendData, loadingTaskData}) => {
    const [isModal, setIsModal] = useState(false)

    const isSuccess = detail.statusID === 4

    const setModal = () => {
        setIsModal(!isModal)
    }

    // console.log(task, detail)
    // console.log(isSuccess)

    const deleteFile = (fileID) => {
        if (isSuccess) return
        epoch_deleteFile(fileID).then(r => {
            console.log(r)
            loadingTaskData()
        })
    }

    // useEffect(() => console.log(isModal), [isModal])

    return (
        <div className={styles.duty_attach_main_block}>
            {
                files.map(i => <DutyAttachFile
                    key={i.fileID}
                    file={i}
                    deleteFile={deleteFile}
                    isSuccess={isSuccess}
                />)
            }
            <DutyAttachAddButton setModal={setModal}/>
            {/*{isModal*/}
            {/*    &&*/}
            {/*    <CSSTransition in={isModal} timeout={1000} classNames={'modal-animation'} >*/}
                    <DutyAttachModal
                        isModal={isModal}
                        setModal={setModal}
                        sendData={sendData}
                        courseID={task.courseID}
                        loadingTaskData={loadingTaskData}
                    />
                {/*</CSSTransition>*/}
            {/*}*/}
        </div>
    );
};

export default DutyAttach;