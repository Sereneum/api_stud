import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import SpaceCourseList from "./Space/SpaceCourseList";

const Main = observer(() => {

    return (
        <Container className='d-flex justify-content-center align-content-center' style={{width: '50vw'}}>
           <SpaceCourseList />
        </Container>
    );
});

export default Main;