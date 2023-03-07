import React, {useContext, useEffect, useState} from 'react';
import {useConfig} from "../../../hooks/useConfig";
import {Container} from "react-bootstrap";
import styles from './Config.module.css'
import {settings} from "../../../utils/settings";
import ConfigBlock from "./ConfigBlock";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {
    gettingCoursesFromServer,
    recordingChangesToServer
} from "../../../chain/serverConfig";
import MySpinner from "../../MySpinner";
import ConfigSpinner from "./ConfigSpinner";
import {bbErase} from "../../../chain/clientConfig";


const Config = observer(() => {


    const {user, course} = useContext(Context)

    let id = user.user.anotherID


    const [active, setActive] = useState([])
    const [passive, setPassive] = useState([])
    const [loadingCourses, setLoadingCourses] = useState(true)


    const [activeSelected, setActiveSelected] = useState([])
    const [passiveSelected, setPassiveSelected] = useState([])


    const clickOnActive = item => {
        setActiveSelected(activeSelected.map((i, index) => item == index ? !i : i))
    }

    const clickOnPassive = item => {
        setPassiveSelected(passiveSelected.map((i, index) => item == index ? !i : i))
    }


    // 1 этап - проверка на наличие бд

    const recording = () => {

        let newActive = active
        let newPassive = passive
        let bbActive = []
        let bbPassive = []

        for (let i = 0; i < activeSelected.length; ++i) {
            if (activeSelected[i]) {
                bbActive.push(i)
                newPassive.unshift(active[i])
            }
        }

        for (let i = 0; i < passiveSelected.length; ++i) {
            if (passiveSelected[i]) {
                newActive.push(passive[i])
                bbPassive.push(i)
            }
        }


        newPassive = bbErase(passive, bbPassive)
        newActive = bbErase(active, bbActive)

        setActiveSelected([...Array(newActive.length).keys()].map(i => false))
        setPassiveSelected([...Array(newPassive.length).keys()].map(i => false))
        setActive(newActive)
        setPassive(newPassive)


        console.log('отправка изменений на сервер...')
        recordingChangesToServer({id: id, active: newActive}).then(r => {
            console.log('r', r)
        })
    }


    useEffect(() => {
        gettingCoursesFromServer(id).then(r => {
            // console.log(r)
            setActive(JSON.parse(r.active))
            setPassive(r.passive)
            setActiveSelected([...Array(r.active.length).keys()].map(i => false))
            setPassiveSelected([...Array(r.passive.length).keys()].map(i => false))
            setLoadingCourses(false)
        })

    }, [])


    return (
        <Container className={styles.config_main_block}>
            <div className={styles.config_nav}>
                <div className={styles.config_title}>
                    Настройка курсов
                </div>
                <div className={styles.config_save} onClick={recording}>
                    Сохранить изменения
                </div>
            </div>

            {loadingCourses
                ?
                <ConfigSpinner/>
                :
                <>
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
                </>
            }

        </Container>
    );
});

export default Config;