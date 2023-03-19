import React, {memo, useEffect, useRef} from 'react';
import styles from "./Config.module.css";
import ConfigItem from "./ConfigItem";

const ConfigBlock = ({list, title, click, isActiveList, rename}) => {

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
                        rename={rename}
                    />)
                }
            </div>
        </div>

    );
};

export default memo(ConfigBlock);