import React, {useReducer} from 'react'
import axios from 'axios'
import {DjserverContext} from './djserverContext'
import {djserverReducer} from './djserverReducer'
import {ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER} from '../types'


export const DjserverState = ({children}) => {
  const initialState = {
    notes: [],
    loading: false
  }
  const [state, dispatch] = useReducer(djserverReducer, initialState)

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const fetchNotes = async (id) => {
    showLoader()
    const res = await axios.get(`http://127.0.0.1:8000/api/category/${id}`)
    const payload = Object.keys(res.data.tasks).map(key => {
      return {
        ...res.data.tasks[key],
        // id: key
      }
    })
    console.log(payload)
    dispatch({type: FETCH_NOTES, payload})
  }

  const addNote = async title => {
    const note = {
      title, date: new Date().toJSON()
    }

    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/task/`, note)
      const payload = {
        ...note,
        id: res.data.name
      }

      dispatch({type: ADD_NOTE, payload})

    } catch (e) {
      throw new Error(e.message)
    }
  }

  const removeNote = async id => {
    await axios.delete(`http://127.0.0.1:8000/api/task/${id}`)

    dispatch({
      type: REMOVE_NOTE,
      payload: id
    })
  }

  return (
    <DjserverContext.Provider value={{
      showLoader, addNote, removeNote, fetchNotes,
      loading: state.loading,
      notes: state.notes
    }}>
      {children}
    </DjserverContext.Provider>
  )
}
