import React, {memo} from 'react';
import styles from './CourseList.module.css'
import reboot_icon from '../../../resources/reboot.svg'

const CourseItem = ({isActive, course, click, index, reboot}) => {

    const clickOnReboot = () => {
        reboot(course.course_id, index)
    }
    return (
        <div className={`${styles.course_item} ${isActive ? styles.isActiveCourse : ''}`} onClick={() => click(index)}>
            <div>{course.course_name}</div>
            {isActive && <img src={reboot_icon} alt="" onClick={clickOnReboot}/>}
        </div>
    );
};


export default memo(CourseItem);