import React from 'react';
import './Space.css'

const Task = ({task, size, index}) => {

    const styleStatus = status => {
        switch (status) {
            case 0: return {color: 'lightslategrey'}
            case 1: return {color: 'lightcoral'}
            case 2: return {color: 'lightskyblue'}
            case 3: return {color: 'lightgoldenrodyellow'}
            case 4: return {color: 'lightgreen'}
        }
    }


    return (
        <div>
            <div className='task'>
                <div>{`${index}. ${task.name}`}</div>
                <div>{'Статус: '} <span style={styleStatus(task.statusID)}>{task.statusName}</span></div>
            </div>
            {size === index ? '' : <hr className='hr' />}
        </div>
    );
};

export default Task;