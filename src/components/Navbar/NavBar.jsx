import React, {memo, useContext, useEffect, useState} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
// import {Context} from "../../index";
import mgriLogo from '../../resources/mgri.svg'
import humanLogo from '../../resources/human_logo.svg'
import styles from './NavBar.module.css'
import {useMediaQuery} from "react-responsive";
import Mail from "../DesktopMenu/Mail/Mail";
import {epoch_checkerMail} from "../../epoch/epochServer";
import ScheduleLink from "../DesktopMenu/ScheduleLink/ScheduleLink";
import MenuButton from "../DesktopMenu/Menu/MenuButton";


const NavBar = observer(({isLoaded}) => {

    const [mailCounter, setMailCounter] = useState({})

    useEffect(() => {
        epoch_checkerMail().then(r => setMailCounter(r))
    }, [])


    const isMobile = useMediaQuery({query: '(max-width: 1300px)'})
    const navigator = useNavigate()

    return (
        <>

            <Navbar className={styles.navbar} variant="dark">
                {/* <Container> */}
                <Navbar.Brand className={styles.navbar_brand} onClick={() => navigator('')}>
                    <img
                        alt=""
                        src={mgriLogo}
                        className={styles.navbar_logo}
                    />
                    <div className={styles.navbar_space}>.Space</div>
                </Navbar.Brand>
                {isLoaded && !isMobile ?
                    <Navbar.Brand className={styles.navbar_info_block}>
                        <Mail messages={mailCounter && mailCounter.data}/>

                        <ScheduleLink />
                        <MenuButton />
                        {/*<img*/}
                        {/*    alt=""*/}
                        {/*    src={humanLogo}*/}
                        {/*    className={styles.navbar_human_logo}*/}
                        {/*/>*/}

                    </Navbar.Brand>
                    :
                    ''
                }
                {/* </Container> */}
            </Navbar>
        </>
    );
});

export default memo(NavBar);