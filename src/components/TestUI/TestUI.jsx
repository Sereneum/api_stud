import React, {useEffect} from 'react';
import {
    epoch_allCourseData,
    epoch_courseData, epoch_fetchActiveCourses
} from "../../epoch/epochServer";

const TestUi = () => {

    const id = 44577
    const course_id = 8997

    useEffect(() => {
        // epoch_courseData(course_id).then(r => console.log('epoch_courseData', r))
        // epoch_allCourseData
        // epoch_fetchActiveCourses(id).then(r => console.log('epoch_fetchActiveCourses', r))
        epoch_allCourseData(id).then(r => console.log('epoch_allCourseDataFromServer', r))
    }, [])

    return (
        <></>
    );
};

export default TestUi;