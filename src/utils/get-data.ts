export const getSelectData = ( select: Array<string> = [] ) => {
    return Object.fromEntries(select.map(el => [el, 1]))
};

export const getUnSelectData = ( unSelect: Array<string> = [] ) => {
    return Object.fromEntries(unSelect.map(el => [el, 0]))
};