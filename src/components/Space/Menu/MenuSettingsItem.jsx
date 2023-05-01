import React from 'react';
import styles from './Menu.module.css'

const MenuSettingsItem = ({text}) => {
    return (
        <div className={styles.settings_item}>

            <div className={styles.check_box}>
                <div></div>
            </div>

            <span>{text}</span>
        </div>
    );
};

export default MenuSettingsItem;