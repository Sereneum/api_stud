import React, {useContext} from 'react';
import styles from "./MenuButton.module.css";
import menu_icon from "../../../resources/menu_icon.svg";
import {Context} from "../../../index";



const MenuButton = () => {

    const id = 'menuOpen'
    const { binder } = useContext(Context)

    const open = () => {
        binder.getFunc(id) && binder.getFunc(id)()
    }

    return (
        <div className={styles.menu} onClick={open}>
            <img className={styles.icon} src={menu_icon} alt=""/>
            <span className={styles.text}>Меню</span>
        </div>
    );
};

export default MenuButton;