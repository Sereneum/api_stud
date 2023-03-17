import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import styles from './Config.module.css'
import ConfigBlock from "./ConfigBlock";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {
    gettingCoursesFromServer,
    recordingChangesToServer
} from "../../../chain/serverConfig";
import ConfigSpinner from "./ConfigSpinner";
import {bbErase} from "../../../chain/clientConfig";
import Spin from "../../Spin";
import ConfigSpinController from "./ConfigSpinController";


const Config = observer(() => {


    const {user, course} = useContext(Context)

    let id = user.user.anotherID

    const [active, setActive] = useState([])
    const [passive, setPassive] = useState([])
    const [loadingCourses, setLoadingCourses] = useState(true)
    const [loadingReqOnGoogleTables, setLoadingReqOnGoogleTables] = useState(false)


    const info = () => {
        console.log('active: ', active)
        console.log('passive: ', passive)
    }

    const clickOnActive = item => {
        setPassive([active[item], ...passive])
        setActive(active.filter((i, index) => item !== index))
    }

    const clickOnPassive = item => {
        setActive([...active, passive[item]])
        setPassive(passive.filter((i, index) => item !== index))
    }


    const recording = () => {
        setLoadingReqOnGoogleTables(true)
        recordingChangesToServer({id: id, active: active}).then(r => {
            // console.log('r', r)
            setLoadingReqOnGoogleTables(false)
        })
    }


    useEffect(() => {
        gettingCoursesFromServer(id).then(r => {
            setActive(typeof r.active == 'string' ? JSON.parse(r.active) : r.active)
            setPassive(r.passive)
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
                <ConfigSpinController isLoading={loadingReqOnGoogleTables}/>
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
                    />

                    <hr className={styles.hr}/>

                    <ConfigBlock
                        title={'Незакрепленные курсы'}
                        list={passive}
                        click={clickOnPassive}
                    />
                </>
            }

        </Container>
    );
});

export default Config;