import {useLoading} from "./useLoading";
import {getUserData} from "../http/serverAPI";
import {getAllCourses} from "../http/studAPI";


export const useConfig = async ({email}) => {

    useLoading({
        func: getUserData,
        args: {email}
    }).then()
}

