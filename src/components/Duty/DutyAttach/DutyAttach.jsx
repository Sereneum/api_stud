import React, {useState} from 'react';
import styles from './DutyAttach.module.css'
import DutyAttachFile from "./DutyAttachFile";
import DutyAttachAddButton from "./DutyAttachAddButton";
import DutyAttachModal from "./DutyAttachModal/DutyAttachModal";

const DutyAttach = ({files, task, detail, sendData, loadingTaskData}) => {
    const [isModal, setIsModal] = useState(false)

    const setModal = () => {
        setIsModal(!isModal)
    }

    return (
        <div className={styles.duty_attach_main_block}>
            {
                files.map(i => <DutyAttachFile key={i.fileID} file={i}/>)
            }
            <DutyAttachAddButton setModal={setModal}/>
            {isModal && <DutyAttachModal
                setModal={setModal}
                sendData={sendData}
                courseID={task.courseID}
                loadingTaskData={loadingTaskData}
            />}
        </div>
    );
};

export default DutyAttach;