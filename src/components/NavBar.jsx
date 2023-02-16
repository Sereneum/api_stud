import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";

const NavBar = observer(() => {

    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white', textDecoration: 'none'}} to={MAIN_ROUTE}>Главная</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button
                            variant={"outline-light"}
                        >
                            Что-то тут будет
                        </Button>
                        {/*<Button*/}
                        {/*    variant={"outline-light"}*/}
                        {/*    style={{marginLeft: 10}}*/}
                        {/*    onClick={() => logOut()}*/}
                        {/*>*/}
                        {/*    Выйти*/}
                        {/*</Button>*/}
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