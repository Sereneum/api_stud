import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {login} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {MAIN_ROUTE} from "../../utils/consts";
import styles from './Login.module.css'
import LoginSpinner from "./LoginSpinner";

const Login = observer(() => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isBadLogin, setIsBadLogin] = useState(false)
    const navigator = useNavigate()
    const {user} = useContext(Context)

    const click = async e => {
        e.preventDefault()
        setIsLoading(true)
        try {
            let {token, dataUser, moreInfo} = await login(email, password)
            setIsLoading(false)
            if (!token) {
                setIsBadLogin(true)
                return
            }
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
                        className={`${styles.input} ${isBadLogin ? styles.bad : ''}`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        placeholder="Пароль"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        type="password"
                        className={`${styles.input} ${styles.password} ${isBadLogin ? styles.bad : ''}`}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    variant="dark"
                    className={styles.button}
                    onClick={click}
                >
                    {isLoading ? <LoginSpinner /> : 'Войти'}
                </Button>
            </form>
        </Container>
    );
});

export default Login;