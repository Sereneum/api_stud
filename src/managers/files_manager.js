import link_open from "../resources/duty/link_open.svg";
import download_icon from "../resources/duty/download.svg";
import link_icon from "../resources/duty/link_icon.svg";
import excel_file from "../resources/duty/excel_file.svg";
import word_file from "../resources/duty/word_file.svg";
import pdf_file from "../resources/duty/pdf_file.svg";
import pptx_file from "../resources/duty/pptx_file.svg";
import zip_file from "../resources/duty/zip_file.svg";
import picture_file from "../resources/duty/picture_file.svg";
import unknown_file from "../resources/duty/unknown_file.svg";

let list_preview_format = [
    'pdf', 'jpeg', 'jpg', 'png', 'tiff'
]

export const assignorIconDownload = ({fileName}) => {
    if (!fileName) return link_open
    else {
        let format_file = fileName.slice(fileName.lastIndexOf('.') + 1)
        if (list_preview_format.find(e => e === format_file) !== undefined)
            return link_open
        else
            return download_icon
    }
}

export const assignorIcon = ({fileName}) => {
    if (!fileName) return link_icon
    let format = fileName.slice(fileName.lastIndexOf('.') + 1)

    switch (format) {
        case 'xlsx':
            return excel_file
        case 'xls':
            return excel_file
        case 'docx':
            return word_file
        case 'doc':
            return word_file
        case 'pdf':
            return pdf_file
        case 'pptx':
            return pptx_file
        case 'ppt':
            return pptx_file
        case 'zip':
            return zip_file
        case 'png':
            return picture_file
        case 'jpeg':
            return picture_file
        case 'tiff':
            return picture_file
        case 'jpg':
            return picture_file
        default:
            return unknown_file
    }
}

export const handleDownload = ({fileName, link}) => {
    if(!fileName) {
        window.open(link)
        return
    }

    let url = `https://stud.mgri.ru${link}`
    let format_file = url.slice(url.lastIndexOf('.') + 1)


    if(list_preview_format.find(e => e === format_file) !== undefined)
        window.open(url, '_blank')
    else
        window.location.href = url
};