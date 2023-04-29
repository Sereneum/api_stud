import React, {memo, useEffect, useRef, useState} from 'react';
import styles from "./Config.module.css";
import edit_icon from '../../../resources/edit_icon.svg'
import pin_icon from '../../../resources/pin_icon.svg'
import unpin_icon from '../../../resources/unpin_icon.svg'

const ConfigItem = memo(({course, click, index, isActive, rename}) => {

    const [input, setInput] = useState(typeof course.course_name == 'string' ? course.course_name : '')
    const [readMode, setReadMode] = useState(false)
    const ref = useRef(null)

    const readController = () => {
        setReadMode(!readMode)
    }

    useEffect(() => {
        if(readMode) ref.current.focus()
    }, [readMode])

    const change = e => {
        setInput(e.target.value)
        rename(e.target.value, index)
    }


    return (
        <div
            className={`${styles.config_item} ${isActive ? styles.green : styles.gray}`}
        >

            <div className={styles.config_in_item}>



                {
                    isActive
                        ?
                        <>
                            {readMode
                                ?
                                <input
                                    onChange={change}
                                    value={input}
                                    className={styles.config_rename}
                                    ref={ref}
                                />
                            :
                                <div>{course.course_name}</div>
                            }
                            <img
                                alt=""
                                src={edit_icon}
                                className={`${styles.config_icon_in_item} ${readMode ? styles.edit_active : ''}`}
                                onClick={readController}
                            />
                        </>
                        :
                        <div>{course.course_name}</div>
                }
                <img
                    alt=""
                    src={isActive ? unpin_icon : pin_icon}
                    className={styles.config_icon_in_item}
                    onClick={() => click(index)}
                />
            </div>
        </div>
    );
});

export default ConfigItem;