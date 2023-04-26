export const inValidDate = (str) => {
    return new Date(str.split('.')[2] + '-' + str.split('.')[1] + '-' + str.split('.')[0])
}

export const toMonth = (num, fullMode=true) => {
    switch (num) {
        case (0): return fullMode ? 'январь' : 'янв.'
        case (1): return fullMode ? 'февраль' : 'февр.'
        case (2): return fullMode ? 'март' : 'март.'
        case (3): return fullMode ? 'апрель' : 'апр.'
        case (4): return fullMode ? 'май' : 'май.'
        case (5): return fullMode ? 'июнь' : 'июнь'
        case (6): return fullMode ? 'июль' : 'июль'
        case (7): return fullMode ? 'август' : 'авг.'
        case (8): return fullMode ? 'сентябрь' : 'сент.'
        case (9): return fullMode ? 'октярь' : 'окт.'
        case (10): return fullMode ? 'ноябрь' : 'нояб.'
        case (11): return fullMode ? 'декабрь' : 'дек.'
    }
}