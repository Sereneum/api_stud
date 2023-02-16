import React, {useEffect, useMemo, useState} from 'react';
import {Card, ListGroup} from "react-bootstrap";
import {getCourseStatus} from "../../http/studAPI";
import {parserCourseStatus} from "../../parsers/parser";
import {settings} from "../../utils/settings";
import Course from "./Course";

const CourseListStatus = ({course_name, tasks}) => {

    let [list, setList] = useState([])


    const processArray = async (courses) => {
        const promises = courses.map(i => getCourseStatus(i.course_id))
        const res = await Promise.all(
            promises.map(p => p.then())
        )
        setList(res.map((i, index) => <Course key={courses[index].course_id} data={i} course={courses[index]}/>))
    }

    useEffect(() => {
        processArray(settings.courses)
    }, [settings])


    return (
        <div>
            {
                !list
            ?
                    'пусто'
            :
                    list
            }
        </div>
    );
};

export default CourseListStatus;