import React from 'react';
import './Space.css'
import {observer} from "mobx-react-lite";

const CourseItem = ({isActive, course, click, index}) => {


    return (
        <div className={`course-item ${isActive ? 'isActiveCourse' : ''}`} onClick={() => click(index)}>
            <div>{course.course_name}</div>
        </div>
    );
};

//

export default CourseItem;