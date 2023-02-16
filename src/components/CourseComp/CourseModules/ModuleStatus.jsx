import React from 'react';

const ModuleStatus = ({styles, status}) => {
    return (
        <div className={styles}>
            {`${status}`}
        </div>
    );
};

export default ModuleStatus;