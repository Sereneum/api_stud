import {useCallback, useEffect, useState} from "react";
import {assignorIcon, assignorIconDownload, handleDownload} from "./files_manager";

export const useFileManager = ({file}) => {
    const [icon, setIcon] = useState(null)
    const [downloadIcon, setDownloadIcon] = useState(null)


    useEffect(() => {
        setIcon(() => assignorIcon({fileName: file.nameFile}))
        setDownloadIcon(() => assignorIconDownload({fileName: file.nameFile}))
    }, [])

    const download = useCallback(() => {
        handleDownload({fileName: file.nameFile, link: file.link})
    }, [file.nameFile, file.link])

    return {icon, downloadIcon, download}
}