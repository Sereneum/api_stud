import React from 'react';
import styles from "./Config.module.css";
import ConfigItem from "./ConfigItem";
import MySpinner from "../../MySpinner";
import ConfigSpinner from "./ConfigSpinner";

const ConfigBlock = ({list, title, click, isActiveList}) => {

    // selected[index]
    // console.log(selected[0])
    return (
        <div className={styles.config_block}>
            <div className={styles.config_local_title}>
                {title}
            </div>
            <div className={styles.config_list}>
                {
                    list.map((i, index) => <ConfigItem
                        key={i.course_id}
                        isActive={isActiveList}
                        course={i}
                        click={click}
                        index={index}
                    />)
                }
            </div>
        </div>

    );
};

export default ConfigBlock;