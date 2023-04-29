export const inValidDate = (str) => {
    let ans = new Date(str)
    console.log('ans', ans)
    return ans
    // let prop = str.split('.')[2] + '-' + str.split('.')[1] + '-' + str.split('.')[0]
    // let new_date = new Date(str.split('.')[2] + '-' + str.split('.')[1] + '-' + str.split('.')[0])
    //
    // console.log('str', str)
    // console.log('prop', prop)
    // console.log('new_date', new_date)
    // return new_date
}

export const dateGetter = (str) => {
    let date = new Date(str)
    return  date == NaN
        ? new Date(str.split('.')[2] + '-' + str.split('.')[1] + '-' + str.split('.')[0])
        : date
}

export const toMonth = (num, fullMode=true) => {
    switch (num) {
        case (0): return fullMode ? 'Январь' : 'янв.'
        case (1): return fullMode ? 'Февраль' : 'февр.'
        case (2): return fullMode ? 'Март' : 'март.'
        case (3): return fullMode ? 'Апрель' : 'апр.'
        case (4): return fullMode ? 'Май' : 'май.'
        case (5): return fullMode ? 'Июнь' : 'июнь'
        case (6): return fullMode ? 'Июль' : 'июль'
        case (7): return fullMode ? 'Август' : 'авг.'
        case (8): return fullMode ? 'Сентябрь' : 'сент.'
        case (9): return fullMode ? 'Октярь' : 'окт.'
        case (10): return fullMode ? 'Ноябрь' : 'нояб.'
        case (11): return fullMode ? 'Декабрь' : 'дек.'
    }
}