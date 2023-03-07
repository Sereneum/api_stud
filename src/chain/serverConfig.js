import {useLoading} from "../hooks/useLoading";
import {addUserData, getUserData} from "../http/serverAPI";
import {getAllCourses, preloadingCourse} from "../http/studAPI";

const loadingActiveCourses = id => {
    return new Promise((resolve, reject) => {
        getUserData(id)
            .then(d => {
                if ('data' in d) resolve(d.data.active)
                else resolve([])
            })
            .catch(err => reject(err))
    })
}

const compGettingAllCourses = () => {
    return new Promise((resolve, reject) => {
        getAllCourses()
            .then(arr => {
                let comp = []
                for (let i of arr) comp.push({course_id: i.courseID, course_name: i.discipline})
                resolve(comp)
            })
            .catch(err => reject(err))
    })
}

const division = (active, all) => {
    const passive = []
    for (let i of all) {
        let isPresent = false
        for (let j of active)
            if (i.course_id == j.course_id) {
                isPresent = true;
                break
            }

        if (!isPresent) passive.push(i)
    }
    return {active: active, passive: passive}
}


export const gettingCoursesFromServer = id => {
    return new Promise((resolve, reject) => {
        Promise.all([loadingActiveCourses(id), compGettingAllCourses()])
            .then(r => {
                resolve(division(r[0], r[1]))
            })
            .catch(err => reject(err))
    })
}

export const recordingChangesToServer = ({id, active}) => {
    return new Promise((resolve, reject) => {
        addUserData({id, active})
            .then(r => {
                resolve(r)
            })
            .catch(err => reject(err))
    })
}


export const loadingCoursesOnMain = id => {
    return new Promise((resolve, reject) => {
        loadingActiveCourses(id).then(d => {
            preloadingCourse(JSON.parse(d)).then(courses => {
                resolve(courses)
            })
        })
    })
}







