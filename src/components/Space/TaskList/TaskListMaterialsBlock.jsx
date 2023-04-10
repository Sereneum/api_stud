import React from 'react';
import styles from "./TaskList.module.css";
import DutyFilesList from "../../Duty/DutyFilesList";

const TaskListMaterialsBlock = ({materials, isEmpty, isOpen, open}) => {
    return (
        <div>
                {isEmpty
                    &&
                    <div className={styles.tasks_not_found}>Нет заданий</div>
                }

                <div className={styles.materials_breaker}></div>
                {isOpen
                    ?
                    <DutyFilesList files={materials}/>
                    :
                    <div
                        className={styles.open_materials}
                        onClick={open}
                    >Открыть материалы</div>
                }
        </div>
    );
};

export default TaskListMaterialsBlock;