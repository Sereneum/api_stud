//
// import {addUserData, getUserData} from "../http/serverAPI";
// import {fullGetDataDuty, getAllCourses, preloadingCourse} from "../http/studAPI";
//
//
// // Replaced (*)
// const loadingActiveCourses = id => {
//     return new Promise((resolve, reject) => {
//         getUserData(id)
//             .then(d => {
//                 if ('data' in d) resolve(d.data.active)
//                 else resolve([])
//             })
//             .catch(err => reject(err))
//     })
// }
//
// // Replaced (*)
// const compGettingAllCourses = () => {
//     return new Promise((resolve, reject) => {
//         getAllCourses()
//             .then(arr => {
//                 let comp = []
//                 for (let i of arr) comp.push({course_id: i.courseID, course_name: i.discipline})
//                 resolve(comp)
//             })
//             .catch(err => reject(err))
//     })
// }
//
// // Replaced (*)
// const division = (active, all) => {
//     const passive = []
//     for (let i of all) {
//         let isPresent = false
//         for (let j of typeof active == 'string' ? JSON.parse(active): active) {
//             if (i.course_id === j.course_id) {
//                 isPresent = true;
//                 break
//             }
//         }
//
//         if (!isPresent) passive.push(i)
//     }
//     return {active: active, passive: passive}
// }
//
// // Replaced (*)
// export const gettingCoursesFromServer = id => {
//     return new Promise((resolve, reject) => {
//         Promise.all([loadingActiveCourses(id), compGettingAllCourses()])
//             .then(r => {
//                 resolve(division(r[0], r[1]))
//             })
//             .catch(err => reject(err))
//     })
// }
//
// // Replaced (*)
// export const recordingChangesToServer = ({id, active}) => {
//     return new Promise((resolve, reject) => {
//         addUserData({id, active})
//             .then(r => {
//                 resolve(r)
//             })
//             .catch(err => reject(err))
//     })
// }
//
// // Replaced (*)
// export const loadingCoursesOnMain = id => {
//     return new Promise((resolve, reject) => {
//         loadingActiveCourses(id).then(d => {
//             preloadingCourse(typeof d == 'string' ? JSON.parse(d): d).then(courses => {
//                 resolve(courses)
//             })
//         })
//     })
// }
//
// export const superFullLoadingCourses = ({id=null, update=null, mode=null}) => {
//     return new Promise((resolve, reject) => {
//
//         let assistant = (res, d) => {
//             let full_answer = []
//             // console.log('assistant', mode)
//             // console.log('update', update)
//             // console.log('if first', d)
//             for(let i = 0; i < res.length; ++i) {
//                 full_answer.push({...res[i], course_name: d[i].course.course_name, course_id: d[i].course.course_id})
//             }
//
//             return full_answer
//         }
//
//         if(mode=='update') {
//             fullGetDataDuty(update).then(res => {
//                 let full_answer = assistant(res, update)
//                 resolve({course: update, full: full_answer})
//             })
//
//         } else {
//             loadingCoursesOnMain(id).then(d => {
//                 fullGetDataDuty(d).then(res => {
//                     let full_answer = assistant(res, d)
//                     resolve({course: d, full: full_answer})
//                 })
//             })
//         }
//
//
//     })
//
// }
//
//
//
//
//
//
//
