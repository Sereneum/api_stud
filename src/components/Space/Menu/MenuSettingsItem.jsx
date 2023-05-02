import React from 'react';
import styles from './Menu.module.css'

const MenuSettingsItem = ({text}) => {
    return (
        <div className={styles.settings_item}>
            <span className={styles.check_text}>{text}</span>
            <div className={styles.check_box}>
                <div ></div>
            </div>

            
        </div>
    );
};

export default MenuSettingsItem;