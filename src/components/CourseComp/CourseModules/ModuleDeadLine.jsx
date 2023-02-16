import React from 'react';

const ModuleDeadLine = ({styles, deadline}) => {
    return (
        <div className={styles}>
            {`${deadline}`}
        </div>
    );
};

export default ModuleDeadLine;