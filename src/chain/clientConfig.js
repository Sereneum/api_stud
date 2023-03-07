export const bbErase = (arr, bb) => {

    let newArr = []
    for(let i = 0; i < arr.length; ++i) if(bb.indexOf(i) === -1) newArr.push(arr[i])

    return newArr
}