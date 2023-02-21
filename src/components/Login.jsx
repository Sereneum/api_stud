import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form, InputGroup, Row} from "react-bootstrap";
import {check, login, moreInfo} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import styles from './Login.module.css'

const Login = observer(() => {

    // console.log('login')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigator = useNavigate()
    const {user} = useContext(Context)

    const click = async e => {
        e.preventDefault()

        try {
            let {token, dataUser, moreInfo} = await login(email, password)
            if (token === undefined) return
            user.setToken(token)
            localStorage.setItem('token', token)

            user.setIsAuth(true)
            user.setUser(dataUser)
            user.setMoreInfo(moreInfo)
            navigator(MAIN_ROUTE)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (user.isAuth) navigator(MAIN_ROUTE)
    }, [])


    return (
        <Container
            style={{
                // height: window.innerHeight - 54,
                width: "100%"
            }}
            className={styles.container}
        >
            <form className={styles.login_block}>
                <div className={styles.login_title}>Электронно-образовательная платформа 2.0</div>
                <div className={styles.tip}>Выполните вход через свою учетную запись stud.mgri.ru</div>
                <div className={styles.input_group}>
                    <Form.Control
                        placeholder="Логин"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        className={`${styles.input} ${styles.email}`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        placeholder="Пароль"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        type="password"
                        className={`${styles.input} ${styles.password}`}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    variant="dark"
                    className={styles.button}
                    onClick={click}
                >
                    Войти
                </Button>
            </form>
        </Container>
    );
});

export default Login;


// <div>
//     {/*<NavBar isLoaded={false}/>*/}
//
//     <Container
//         className='d-flex justify-content-center '
//
//         style={{
//             height: window.innerHeight - 54
//         }}
//     >
//         <Card
//             // style={{
//             //     width: 600,
//             //     backgroundColor: '#697780',
//             //     font: 'Helvetica'
//             // }}
//             className='p-5'
//             className={styles.login_block}
//         >
//             <h2 className='m-auto'>{'Авторизация'}</h2>
//             <Form className='col-md-auto'>
//                 <Form.Group className='d-flex flex-column mb-5'>
//                     <Form.Control
//                         className="mt-2"
//                         placeholder="введите ваш email"
//                         style={{color: "black", backgroundColor: '#c0c0c0'}}
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                     />
//                     <Form.Control
//                         className="mt-2"
//                         placeholder="введите пароль"
//                         style={{color: "black", backgroundColor: '#c0c0c0'}}
//                         type={'password'}
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                     />
//                     <Row className='d-flex justify-content-between mt-3'>
//                         <Button
//                             variant="outline-dark"
//                             className="mt-3 align-self-end"
//                             type={"submit"}
//                             onClick={click}
//                         >
//                             Войти
//                         </Button>
//                     </Row>
//
//                 </Form.Group>
//             </Form>
//         </Card>
//
//     </Container>
// </div>