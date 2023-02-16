import React from 'react';

const ModuleNumberTask = ({number, styles}) => {
    return (
        <div className={styles}>
            {`Задание ${number}`}
        </div>
    );
};

export default ModuleNumberTask;