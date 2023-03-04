import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../../utils/consts";
import mgriLogo from '../../resources/mgri.svg'
import humanLogo from '../../resources/human_logo.svg'


import styles from './NavBar.module.css'
import Stars from "../Stars/Stars";

const NavBar = observer(({isLoaded}) => {


    const {user, course} = useContext(Context)


    const user_info = () => {
        try {
            return `${user.user.first_name} ${user.user.last_name}, ${user.moreInfo.group.item1}`
        } catch (e) {
            return ''
        }
    }

    return (
        <>

            <Navbar className={styles.navbar} variant="dark">
                <Container>
                    <Navbar.Brand className={styles.navbar_brand}>
                        <img
                            alt=""
                            src={mgriLogo}
                            className={styles.navbar_logo}
                        />
                        <div className={styles.navbar_space}>.Space</div>
                    </Navbar.Brand>
                    {isLoaded ?
                        <Navbar.Brand className={styles.navbar_info_block}>
                            <div className={styles.navbar_student}>{user_info()}</div>
                            {/*{user_info()}*/}
                            <img
                                alt=""
                                src={humanLogo}
                                className={styles.navbar_human_logo}
                            />
                        </Navbar.Brand>
                        :
                        ''
                    }
                </Container>
            </Navbar>
        </>
    );
});

export default NavBar;

// {'d-flex d-inline-block align-top'}>
// {`ml-auto font_M_Ying_Hei d-flex d-inline-block align-top`}