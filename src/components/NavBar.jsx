import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import logo from '../resources/space_logo_black.svg'
// import woff from '../resources/M_Ying_Hei.woff2'
import '../index.css'

const NavBar = observer(() => {

    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: 24,
                        marginLeft: -40,
                    }}
                    className='font_M_Ying_Hei'
                    to={MAIN_ROUTE}
                >.Space
                </NavLink>

                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button
                            variant={"outline-light"}
                        >
                            Что-то тут будет
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={"outline-light"}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;