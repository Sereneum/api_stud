import React, {useContext, useState} from 'react';
import {useConfig} from "../../../hooks/useConfig";
import {Container} from "react-bootstrap";
import styles from './Config.module.css'
import {settings} from "../../../utils/settings";
import ConfigBlock from "./ConfigBlock";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";


const Config = observer(() => {


    let email = "tree_en@mail.ru"

    const {user, course} = useContext(Context)

    // console.log(user.user)

    const [active, setActive] = useState(settings.courses)
    const [passive, setPassive] = useState(settings.courses)


    // loading data...
    // useLoading({
    //     func: getUserData,
    //     args: {email},
    //     setter: d => console.log(d)
    // }).then()

    // useConfig({
    //     email: email
    // }).then()


    const [activeSelected, setActiveSelected] = useState([ ...Array(active.length).keys() ].map( i => false))
    const [passiveSelected, setPassiveSelected] = useState([ ...Array(passive.length).keys() ].map( i => false))


    const clickOnActive = item => {
        setActiveSelected(activeSelected.map((i, index) => item == index ? !i : i))
    }

    const clickOnPassive = item => {
        setPassiveSelected(passiveSelected.map((i, index) => item == index ? !i : i))
    }



    return (
        <Container className={styles.config_main_block}>
            <div className={styles.config_title}>
                Настройка курсов
            </div>
            <ConfigBlock
                title={'Закрепленные курсы'}
                list={active}
                click={clickOnActive}
                selected={activeSelected}
            />

            <hr className={styles.hr}/>

            <ConfigBlock
                title={'Незакрепленные курсы'}
                list={passive}
                click={clickOnPassive}
                selected={passiveSelected}
            />
        </Container>
    );
});

export default Config;