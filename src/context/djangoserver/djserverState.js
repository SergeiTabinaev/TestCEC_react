import React, {useContext, useReducer} from 'react'
import axios from 'axios'
import {DjserverContext} from './djserverContext'
import {djserverReducer} from './djserverReducer'
import {ADD_NOTE, FETCH_NOTES, FETCH_CATS, REMOVE_NOTE, SHOW_LOADER} from '../types'
import {AuthContext} from "../auth/authContext"
import {Redirect} from "react-router-dom"


export const DjserverState = ({children}) => {
  const {isAuthenticated} = useContext(AuthContext)

  const initialState = {
    cats: [],
    notes: [],
    loading: false,
    // isAuthenticated: isAuthenticated
  }
  const [state, dispatch] = useReducer(djserverReducer, initialState)

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const fetchCats = async () => {
    if (isAuthenticated) {
      showLoader()
      const res = await axios.get(`http://127.0.0.1:8000/api/category/`)

      const payload = Object.keys(res.data).map(key => {
        return {
          ...res.data[key],
        }
      })
      dispatch({type: FETCH_CATS, payload})
    }
    else
      return <Redirect to='/login' />
  }

  const fetchNotes = async (id) => {
    if (isAuthenticated) {
      showLoader()
      const res = await axios.get(`http://127.0.0.1:8000/api/category/${id}`)

      const payload = Object.keys(res.data.tasks).map(key => {
        return {
          ...res.data.tasks[key],
        }
      })
      dispatch({type: FETCH_NOTES, payload})
    }
    else
      return <Redirect to='/login' />
  }


  const addNote = async (title, id) => {
    if (isAuthenticated) {
      const resp = await axios.get(`http://127.0.0.1:8000/api/category/${id}`)
      const cat = resp.data.id
      const note = {
        title,
        category: cat
      }

      try {
        await axios.post(`http://127.0.0.1:8000/api/task/`, note)
        const payload = {
          ...note,
        }

        dispatch({type: ADD_NOTE, payload})

      } catch (e) {
        throw new Error(e.message)
      }
    }
    else
      return <Redirect to='/login' />
  }

  const removeNote = async id => {
    if (isAuthenticated) {
      await axios.delete(`http://127.0.0.1:8000/api/task/${id}`)

      dispatch({
        type: REMOVE_NOTE,
        payload: id
      })
    }
    else
      return <Redirect to='/login' />
  }

  return (
    <DjserverContext.Provider value={{
      showLoader, removeNote, fetchNotes, addNote, fetchCats,
      loading: state.loading,
      notes: state.notes,
      cats: state.cats
    }}>
      {children}
    </DjserverContext.Provider>
  )
}
