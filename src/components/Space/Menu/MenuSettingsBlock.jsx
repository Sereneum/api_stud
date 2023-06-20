import React, {useContext, useEffect, useState} from 'react';
import MenuSettingsItem from "./MenuSettingsItem";
import styles from './Menu.module.css'
import {Context} from "../../../index";

const MenuSettingsBlock = () => {


    const {settings} = useContext(Context)

    useEffect(() => {
        console.log(settings.settings)
    }, [])

    const [settingsData, setSettingsData] = useState([
        {text: 'Отображать количество непрочитанных сообщений на почте', isActive: false},
        {text: 'Анимированный фон', isActive: false},

    ])

    const setter = (inpInd) => {
        setSettingsData(
            prevState => prevState.map((item, index) =>
                inpInd === index ? {text: item.text, isActive: !item.isActive} : item
            )
        )
    }


    return (
        <div className={styles.settings_block}>

            {settingsData.map((item, index) =>
                <MenuSettingsItem
                    key={`set${index}`}
                    isActive={item.isActive}
                    text={item.text}
                    setter={() => setter(index)}
                />)}
        </div>
    );
};

export default MenuSettingsBlock;