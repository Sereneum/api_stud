import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import styles from './Config.module.css'
import ConfigBlock from "./ConfigBlock";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import Spin from "../../Spin";
import ConfigSpinController from "./ConfigSpinController";
import {epoch_fetchConfigurableCourses, epoch_updateActiveCourses} from "../../../epoch/epochServer";


const Config = observer(({reCourse}) => {

    const {user} = useContext(Context)

    let id = user.user.anotherID

    const [initiallyCourses, setInitiallyCourses] = useState([])
    const [active, setActive] = useState([])
    const [passive, setPassive] = useState([])
    const [loadingCourses, setLoadingCourses] = useState(true)
    const [loadingReqOnGoogleTables, setLoadingReqOnGoogleTables] = useState(false)
    const [loadingFromMain, setLoadingFromMain] = useState(false)

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
        setLoadingFromMain(true)

        epoch_updateActiveCourses(id, active).then(r => {
            setLoadingReqOnGoogleTables(false)
            reCourse(initiallyCourses, active).then(r_re => {
                setLoadingFromMain(false)
                setInitiallyCourses(active)
            })
        })
    }, [id, active, initiallyCourses])

    const rename = useCallback((value, localIndex) => {
        setActive(active.map((i, mapIndex) =>
            mapIndex === localIndex ? {...i, course_name: value} : i
        ))
    }, [active])


    useEffect(() => {
        epoch_fetchConfigurableCourses(id).then(r => {
            setActive(r.active)
            setInitiallyCourses(r.active)
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
                {/* <div className={styles.config_save} onClick={recording}>
                    Сохранить изменения
                </div>
                <ConfigSpinController isLoading={loadingFromMain}/> */}
            </div>

            {loadingCourses
                ?
                <Spin cl={styles.config_main_spinner}/>
                :
                <>
                    <div className={styles.config_in_item_save_button} onClick={recording}>
                        <div className={styles.config_in_item_save_text}>Сохранить изменения</div>
                        <ConfigSpinController isLoading={loadingFromMain}/>
                    </div>
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