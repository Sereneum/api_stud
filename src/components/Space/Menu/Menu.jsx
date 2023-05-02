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

            <MenuSettingsBlock />


            <div className={styles.we}>
                Проект выполнен студентами кафедры информатики и геоинформационных систем

                <p style={{marginTop: '10px'}}>Романов Максим, ПИ-20</p>
                <p style={{marginTop: '-14px'}}>Могильников Михаил, ПИ-20</p>
            </div>

        </div>
    );
};

export default Menu;