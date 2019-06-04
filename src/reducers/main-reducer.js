const InitialState = {
    notations: [
        "Learn Java Script",
        "Learn React Native",
        "Learn MySQL"
    ],
    userData: {
        firstname: 'User',
        lastname: 'Name'
    },
    authorizeData: {
        email: "",
        password: ""
    },
    imageUri: null
}

export const mainReducer = (state = InitialState, action) => {
    switch(action.type) {
        case "ADD_NEW_NOTATION":
            return {...state, notations: [...state.notations, action.payload]}
        case 'EDIT_USER_DATA':
            return {...state, userData: action.payload}
        case 'AUTHORIZE_DATA_SAVE':
            return {...state, authorizeData: action.payload}
        case 'TAKE_AVATAR_URI':
            return {...state, imageUri: action.payload}
        default: 
            return state
    }
}