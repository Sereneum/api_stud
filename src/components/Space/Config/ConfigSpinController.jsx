import React, {useEffect, useState} from 'react';
import Spin from "../../Spin";
import styles from "./Config.module.css";
import checkmark_white from '../../../resources/checkmark_white.svg'

const ConfigSpinController = ({isLoading}) => {

    const [loadMode, setLoadMode] = useState(0)


    const end = () => {
        return loadMode === 2
            ? <img
                alt=""
                src={checkmark_white}
                className={styles.config_spinner_end}/>
            :
            <></>
    }

    useEffect(() => {
        if(isLoading && loadMode === 0) {
            setLoadMode(1)
            return
        }
        if(!isLoading && loadMode === 1) {
            setLoadMode(2)
        }
    }, [isLoading])


    return (
        <>
            {
                isLoading
                    ? <Spin cl={styles.config_spinner}/>
                    : end()
            }
        </>
    );
};

export default ConfigSpinController;