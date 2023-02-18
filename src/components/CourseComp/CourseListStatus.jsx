// import React, {useEffect, useMemo, useState} from 'react';
// import {Card, ListGroup} from "react-bootstrap";
// import {getCourseStatus} from "../../http/studAPI";
// import {settings} from "../../utils/settings";
// import Course from "./Course";
//
// const CourseListStatus = () => {
//
//
//     let [list, setList] = useState([])
//
//
//     const processArray = async (courses) => {
//         const promises = courses.map(i => getCourseStatus(i.course_id))
//         const res = await Promise.all(
//             promises.map(p => p.then())
//         )
//         setList(res.map((i, index) => <Course key={courses[index].course_id} data={i} course={courses[index]}/>))
//     }
//
//     useEffect(() => {
//         processArray(settings.courses)
//     }, [settings])
//
//
//     return (
//         <div>
//             {
//                 !list
//                     ?
//                     'пусто'
//                     :
//                     list
//             }
//         </div>
//     );
// };
//
// export default CourseListStatus;