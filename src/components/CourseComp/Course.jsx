import React, {useEffect, useState} from 'react';
import {Card, ListGroup} from "react-bootstrap";
import styles from './Course.module.css'
import ModuleStatus from "./CourseModules/ModuleStatus";
import ModuleNumberTast from "./CourseModules/ModuleNumberTask";
import ModuleDeadLine from "./CourseModules/ModuleDeadLine";

const Course = ({data, course}) => {


    const getStyles = status => {
        switch (status) {
            case 0: return styles.status0
            case 1: return styles.status1
            case 2: return styles.status2
            case 3: return styles.status3
            case 4: return styles.status4
        }
    }

    return (
        <Card style={{width: '36rem', padding: 0, backgroundColor: 'lightgray'}} className='m-3'>
            <Card.Header>{course.course_name}</Card.Header>
            <ListGroup variant="flush">
                {data.tasks.map((i) =>
                    <ListGroup.Item
                        key={course.course_name + '_' + i.numberTask}
                        className={`${styles.ListGroup} ${getStyles(i.statusID)}`}
                    >

                        <ModuleNumberTast styles={`${styles.all} `} number={i.numberTask}/>
                        <ModuleStatus styles={`${styles.all}`}  status={i.statusName} statusStyle={getStyles(i.statusID)}/>
                        <ModuleDeadLine styles={`${styles.all}`} deadline={i.deadline} statusStyle={getStyles(i.statusID)}/>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    );
};

export default Course;