import React from 'react';
import styles from './Menu.module.css'

const MenuSettingsItem = ({text, isActive, setter}) => {


    return (
        <div className={styles.settings_item}>
            <span className={styles.check_text}>{text}</span>
            <div
                className={`${styles.check_box} ${isActive ? styles.activeBox : ''}`}
                onClick={setter}
            >
                <div
                    className={`${styles.innerBox} ${isActive ? styles.actInBox : ''}`}>
                </div>

            </div>
        </div>

    );
};

export default MenuSettingsItem;