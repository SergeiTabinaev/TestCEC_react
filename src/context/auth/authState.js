import React, {useReducer} from 'react'
import axios from 'axios'
import {AuthContext} from './authContext'
import {authReducer} from './authReducer'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT
} from '../types'


export const AuthState = ({children}) => {
    const initialState = {
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),
        isAuthenticated: null,
        user: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const load_user = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            }

            try {
                const res = await axios.get(`http://127.0.0.1:8000/auth/users/me/`, config)

                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                })
            } catch (err) {
                dispatch({
                    type: USER_LOADED_FAIL
                })
            }
        } else {
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    }

    const checkAuthenticated = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

            const body = JSON.stringify({ token: localStorage.getItem('access') })

            try {
                const res = await axios.post(`http://127.0.0.1:8000/auth/jwt/verify/`, body, config)

                if (res.data.code !== 'token_not_valid') {
                    dispatch({
                        type: AUTHENTICATED_SUCCESS
                    })
                } else {
                    dispatch({
                        type: AUTHENTICATED_FAIL
                    })
                }
            } catch (err) {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }

        } else {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }
    }

    const login = async (username, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ username, password });

        try {
            const res = await axios.post(`http://127.0.0.1:8000/auth/jwt/create/`, body, config);
            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch(load_user())

        } catch (err) {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            dispatch({
                type: LOGIN_FAIL
            })
        }
    }

    const signup = async (email, username, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ email, username, password })

        try {
            const res = await axios.post(`http://127.0.0.1:8000/auth/users/`, body, config)

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            dispatch({
                type: SIGNUP_FAIL
            })
        }
    }

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        dispatch({
            type: LOGOUT
        })
    }


    return (
        <AuthContext.Provider value={{
            load_user, checkAuthenticated, login, signup, logout,
            access: state.access,
            refresh: state.refresh,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
