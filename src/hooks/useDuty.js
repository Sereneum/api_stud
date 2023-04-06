import {useState} from "react";


export const useDuty = () => {
    const [dutyActive, setDutyActive] = useState({isActive: false, taskIndex: -1, courseIndex: -1})

    const exitFromDuty = () => {
        // dutyActive.isActive
        // &&
        setDutyActive({isActive: false, taskIndex: -1, courseIndex: -1})
    }

    const goToDuty = ({courseIndex, taskIndex}) => {
        setDutyActive({
            isActive: true,
            taskIndex: taskIndex,
            courseIndex: courseIndex
        })
    }

    return {dutyActive, exitFromDuty, goToDuty}
}