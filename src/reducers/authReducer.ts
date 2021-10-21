import { types } from "../types/types";

export const initialState = {
    checking: true,
    // uid: null, 
    // name: null,
}

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case types.authLogin:
            return{
                ...state,
                checking: false,
                ...action.payload
            }
        
        case types.authCheckingFinish:
            return{
                ...state,
                checking: false
            }

        case types.authStartLogout:
            return{
                checking: false
            }
        default: 
        return state;
        
    }
}