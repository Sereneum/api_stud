import React, {memo, useEffect, useRef, useState} from 'react';

import styles from './Stars.module.css'
import Star from "./Star";

const Stars = () => {

    const [stars, setStars] = useState([])

    useEffect(() => {
        let huddle = []
        let limit = 201
        for(let i = 0; i < limit; ++i) {
            huddle.push(<Star key={`s${i}`}/>)
        }

        setStars(huddle)
    }, [])


    console.log(stars)




    return (
            <div className={styles.space}>
                {stars}
            </div>
    );
};

export default Stars;