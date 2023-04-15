import React, {useEffect} from 'react';
import styles from './Mail.module.css'
import mail_icon from '../../../resources/mail_icon.svg'

const Mail = ({messages}) => {
    const isMessages = messages && messages.count && messages.count > 0
    const url = 'https://stud.mgri.ru/WebApp/#/mail/all'

    const open = () => {
        window.open(url, '_blank')
    }

    return (
        <div className={styles.mail} onClick={open}>
            <img src={mail_icon} alt=""/>
            <span className={styles.text}>Почта</span>
            <span className={styles.counter} style={{display: isMessages ? '' : 'none'}}>
                {isMessages && messages.count}
            </span>
        </div>
    );
};

export default Mail;