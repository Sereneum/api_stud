import React, {useContext, useState} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import mgriLogo from '../resources/mgri.svg'
import humanLogo from '../resources/human_logo.svg'
import '../index.css'

const NavBar = observer(() => {

    const {user} = useContext(Context)

    // console.log(user.moreInfo.group.item1)

    return (
        <Navbar className='navbar' variant="dark" style={{backgroundColor: 'black'}}>
            <Container>
                    <Navbar.Brand className={'d-flex d-inline-block align-top'}>
                        <img
                            alt=""
                            src={mgriLogo}
                            className="d-inline-block align-top"
                            style={{width: 30}}
                        />
                        <div className='font_M_Ying_Hei' style={{marginLeft: 8, fontSize: 24}}>.Space</div>
                    </Navbar.Brand>

                {user.isAuth ?
                    // <Nav className="ml-auto" style={{color: "white"}}>
                    //     <Button variant={"outline-light"}> Что-то тут будет</Button>
                    // </Nav>
                    <div className={`ml-auto font_M_Ying_Hei d-flex d-inline-block align-top`} style={{color: "white"}}>
                        {`${user.user.first_name} ${user.user.last_name}, ${user.moreInfo.group.item1}`}

                        <img
                            alt=""
                            src={humanLogo}
                            className="d-inline-block align-top"
                            style={{width: 30}}
                        />
                    </div>
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