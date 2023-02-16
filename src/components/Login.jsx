import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";


const Login = observer(() => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigator = useNavigate()
    const {user} = useContext(Context)

    const click = async () => {
        try {
            let token = await login(email, password)
            if(token === undefined) return

            user.setIsAuth(true)
            user.setToken(token)
            navigator(MAIN_ROUTE)
        } catch (e) {
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        if(user.isAuth) navigator(MAIN_ROUTE)
    }, [])


    return (
        <Container
            className='d-flex justify-content-center align-content-center'
            style={{
                height: window.innerHeight - 54
            }}
        >
            <Card
                style={{
                    width: 600,
                    backgroundColor: '#697780',
                    font: 'Helvetica'
                }}
                className='p-5'
            >
                <h2 className='m-auto'>{'Авторизация'}</h2>
                <Form className='col-md-auto'>
                    <Form.Group className='d-flex flex-column mb-5'>
                        <Form.Control
                            className="mt-2"
                            placeholder="введите ваш email"
                            style={{color: "black", backgroundColor: '#c0c0c0'}}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-2"
                            placeholder="введите пароль"
                            style={{color: "black", backgroundColor: '#c0c0c0'}}
                            type={'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row className='d-flex justify-content-between mt-3'>
                            <Button
                                variant="outline-dark"
                                className="mt-3 align-self-end"
                                onClick={() => click()}
                            >
                                Войти
                            </Button>
                        </Row>

                    </Form.Group>
                </Form>
            </Card>

        </Container>
    );
});

export default Login;