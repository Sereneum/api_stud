import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import './Space.css'
import '../../index.css'
import Task from "./TaskList/Task";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import CourseList from "./CourseList/CourseList";
import TaskList from "./TaskList/TaskList";
import DeadlineList from "./DeadlineList/DeadlineList";

const Space = observer(() => {

    const {course} = useContext(Context)

    const activeCourse = (index) => {
        course.setActiveCourse(index)
    }

    const [deadlineTasks, setDeadlineTasks] = useState([])

    useEffect(() => {
        // console.log('useEffect')
        setDeadlineTasks(allTasks())
    }, [course.courses])

    const allTasks = () => {
        try {
            let tasks = []
            for (let cour of course.courses) {
                for (let task of cour.tasks) {
                    if(task.statusID === 0) tasks.push(task)
                }
            }
            return tasks
        } catch (e) {
        }
    }

    const allTasksForDev = () => {
        try {
            let tasks = []
            for (let cour of course.courses) {
                if(tasks.length > 5) break
                for (let task of cour.tasks) {
                    if(tasks.length > 5) break
                    tasks.push(task)
                }
            }
            return tasks
        } catch (e) {
        }
    }



    return (
        <Container className='space'>
            <CourseList course={course} activeCourse={activeCourse}/>
            <TaskList course={course}/>
            <DeadlineList tasks={deadlineTasks}/>
        </Container>
    );
});


export default Space;