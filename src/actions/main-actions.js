export const addNewNotation = (value) => {
    return {type: 'ADD_NEW_NOTATION', payload: value}
}

export const editUserData = (value) => {
    return {type: "EDIT_USER_DATA", payload: value}
}

export const authorizeDataSave = (value) => {
    return {type: "AUTHORIZE_DATA_SAVE", payload: value}
}

export const takeAvatarUri = (value) => {
    return {type: 'TAKE_AVATAR_URI', payload: value}
}