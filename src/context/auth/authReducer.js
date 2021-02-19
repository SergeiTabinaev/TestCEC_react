import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT,
} from '../types'

const handlers = {
        [AUTHENTICATED_SUCCESS]: state => ({...state, isAuthenticated: true}),
        [LOGIN_SUCCESS]: state => ({...state}),
        [SIGNUP_SUCCESS]: (state) => ({...state, isAuthenticated: true}),  //или false нужен payload? {payload}
        [USER_LOADED_SUCCESS]: (state, {payload}) => ({...state, user: payload}),
        [AUTHENTICATED_FAIL]: state => ({...state, isAuthenticated: false}),
        [USER_LOADED_FAIL]: state => ({...state, user: null}),
        [LOGIN_FAIL]: state => ({...state}),
        [SIGNUP_FAIL]: state => ({...state}),
        [LOGOUT]: state => ({ ...state, access: null, refresh: null, isAuthenticated: false, user: null}),

        DEFAULT: state => state
}

export const authReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}




