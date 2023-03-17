import React from 'react';
import styles from "./Config.module.css";
import edit_icon from '../../../resources/edit_icon.svg'
import pin_icon from '../../../resources/pin_icon.svg'
import unpin_icon from '../../../resources/unpin_icon.svg'

const ConfigItem = ({course, click, index, isActive}) => {
    return (
        <div
            className={styles.config_item}
            onClick={() => click(index)}
        >
            <div className={styles.config_in_item}>
                <div>{course.course_name}</div>
                {
                    isActive
                        ?
                        <img
                            alt=""
                            src={edit_icon}
                            className={styles.config_icon_in_item}
                        />
                        :
                        ''
                }
                <img
                    alt=""
                    src={isActive ? pin_icon : unpin_icon}
                    className={styles.config_icon_in_item}
                />

            </div>
        </div>
    );
};

export default ConfigItem;