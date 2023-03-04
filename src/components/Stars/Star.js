import React, {memo} from 'react';
import styles from "./Stars.module.css";

const Star = memo(() => {
    return (
        <div
            className={styles.star}
            style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`
            }}
        ></div>
    );
});

export default Star;
