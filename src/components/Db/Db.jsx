import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {settings} from "../../utils/settings";
import {getAllCourses, preloadingCourse} from "../../http/studAPI";
import MySpinner from "../MySpinner";
import {ListGroup} from "react-bootstrap";
import {useLoading} from "../../hooks/useLoading";

const Db = observer(() => {

    const {user, course} = useContext(Context)
    const [loadingCourse, setLoadingCourse] = useState(true)
    const [all, setAll] = useState([])

    const active = useMemo(() => settings.courses, [settings])


    useLoading({
        func: getAllCourses,
        setter: d => setAll(d),
        loader: () => setLoadingCourse(false)
    }).then()


    if (loadingCourse) return <MySpinner/>
    console.log(all)

    return (
        <ListGroup style={{width: 560, margin: 'auto'}}>
            {all.map(i =>
                <ListGroup.Item key={i.courseID}>{i.courseID}</ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default Db;