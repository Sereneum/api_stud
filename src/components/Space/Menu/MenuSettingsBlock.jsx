import React from 'react';
import MenuSettingsItem from "./MenuSettingsItem";
import styles from './Menu.module.css'

const MenuSettingsBlock = () => {

    const set_settings = [
        {text: 'Отображать количество непрочитанных сообщений на почте', isActive: false},
        {text: 'Анимированный фо', isActive: false},
    ]

    return (
        <div className={styles.settings_block}>

            {set_settings.map((item, index) =>
                <MenuSettingsItem key={`set${index}`} text={item.text}/>)}
        </div>
    );
};

export default MenuSettingsBlock;