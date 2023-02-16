import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";

const FindForm = () => {

    const [input, setInput] = useState('')
    const action = input => {
    }

    return (
        <Container className='d-flex justify-content-center align-content-center' style={{width: '50vw'}}>
            <Form style={{color: 'white', appearance: 'textfield'}} className='col-md-auto ml-2 mt-5'>
                <Form.Group className="mb-3">
                    <Form.Label>Курс</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Курс..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </Form.Group>
                <Button variant="outline-light" type="button" onClick={() => action(input)}>
                    Получить данные
                </Button>
            </Form>
        </Container>
    );
};

export default FindForm;