import React from 'react';
import styles from "./Config.module.css";

const ConfigItem = ({isActive, course, click, index}) => {
    return (
        <div
            className={`${styles.config_item} ${isActive ? styles.isActive : ''}`}
            onClick={() => click(index)}
        >
            <div>{course.course_name}</div>
        </div>
    );
};

export default ConfigItem;