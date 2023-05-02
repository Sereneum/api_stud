import React, {useContext} from 'react';
import styles from './Menu.module.css'
import {Context} from "../../../index";
import MenuSettingsItem from "./MenuSettingsItem";
import MenuSettingsBlock from "./MenuSettingsBlock";

const Menu = () => {

    const {user} = useContext(Context)
    // console.log(user.user)


    return (
        <div className={styles.block}>
            <div className={styles.title}>{`${user.user?.last_name} ${user.user?.first_name}`}</div>
            {/*<div className={styles.personal_data}>*/}
            {/*    {user.user?.email}*/}
            {/*</div>*/}

            <div className={styles.settings_title}>Настройки</div>
            <MenuSettingsBlock />

            <div className={styles.settings_title}>Авторы</div>

            <div className={styles.autors_block}>
                <div className={styles.autor}>
                    <div className={styles.autor_name}>Романов Максим</div>
                    <div className={styles.autor_solutions}>Backend, Frontend developing</div>
                </div>
                <div className={styles.autor}>
                    <div className={styles.autor_name}>Могильников Михаил</div>
                    <div className={styles.autor_solutions}>Web-designer, UI/UX, Frontend developing</div>
                </div>
            </div>
            <div className={styles.additional_info}>
                Группа: ПИ-20 <br />
                Кафедра информатики и геоинформационных систем <br /> <br /> 
                Российский государственный геологоразведочный университет имени Серго Орджоникидзе 
            </div>

            <div className={styles.breaker}></div>
            <div className={styles.exit_block}>
                <div className={styles.exit_text}>Выйти</div>
            </div>

        </div>
    );
};

export default Menu;