import {useState} from "react";

export const useConfig = () => {
    const [isActiveConfig, setIsActiveConfig] = useState(false)
    const disableConfig = () => isActiveConfig && setIsActiveConfig(false)
    const enableConfig = () => !isActiveConfig && setIsActiveConfig(true)

    return {isActiveConfig, disableConfig, enableConfig}
}