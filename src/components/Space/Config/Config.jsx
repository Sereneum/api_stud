import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import styles from './Config.module.css'
import ConfigBlock from "./ConfigBlock";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {
    gettingCoursesFromServer,
    recordingChangesToServer
} from "../../../chain/serverConfig";
import Spin from "../../Spin";
import ConfigSpinController from "./ConfigSpinController";


const Config = observer(() => {

    const {user, course} = useContext(Context)

    let id = user.user.anotherID

    const [active, setActive] = useState([])
    const [passive, setPassive] = useState([])
    const [loadingCourses, setLoadingCourses] = useState(true)
    const [loadingReqOnGoogleTables, setLoadingReqOnGoogleTables] = useState(false)

    const clickOnActive = useCallback(item => {
        setPassive([active[item], ...passive])
        setActive(active.filter((i, index) => item !== index))
    }, [active, passive])

    const clickOnPassive = useCallback(item => {
        setActive([...active, passive[item]])
        setPassive(passive.filter((i, index) => item !== index))
    }, [passive])


    const recording = useCallback(() => {
        setLoadingReqOnGoogleTables(true)
        recordingChangesToServer({id: id, active: active}).then(r => {
            setLoadingReqOnGoogleTables(false)
        })
    }, [id, active])

    const rename = useCallback((value, localIndex) => {
        setActive(active.map((i, mapIndex) =>
            mapIndex === localIndex ? {...i, course_name: value} : i
        ))
    }, [active])


    useEffect(() => {
        gettingCoursesFromServer(id).then(r => {
            setActive(typeof r.active == 'string' ? JSON.parse(r.active) : r.active)
            setPassive(r.passive)
            setLoadingCourses(false)
        })

    }, [])

    const liar = useCallback(() => {}, [])

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
                <Spin cl={styles.config_main_spinner}/>
                :
                <>
                    <ConfigBlock
                        title={'Закрепленные курсы'}
                        list={active}
                        click={clickOnActive}
                        isActiveList={true}
                        rename={rename}
                    />

                    <hr className={styles.hr}/>

                    <ConfigBlock
                        title={'Незакрепленные курсы'}
                        list={passive}
                        click={clickOnPassive}
                        isActiveList={false}
                        rename={liar}
                    />
                </>
            }

        </Container>
    );
});

export default memo(Config);