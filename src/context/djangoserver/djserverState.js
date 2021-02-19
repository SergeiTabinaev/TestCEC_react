import React, {useReducer} from 'react'
import axios from 'axios'
import {DjserverContext} from './djserverContext'
import {djserverReducer} from './djserverReducer'
import {ADD_NOTE, FETCH_NOTES, FETCH_CATS, REMOVE_NOTE, SHOW_LOADER} from '../types'


export const DjserverState = ({children}) => {
  const initialState = {
    cats: [],
    notes: [],
    loading: false
  }
  const [state, dispatch] = useReducer(djserverReducer, initialState)

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const fetchCats = async () => {
    showLoader()
    const res = await axios.get(`http://127.0.0.1:8000/api/category/`)

    const payload = Object.keys(res.data).map(key => {
      return {
        ...res.data[key],
      }
    })
    dispatch({type: FETCH_CATS, payload})
  }

  const fetchNotes = async (id) => {
    showLoader()
    const res = await axios.get(`http://127.0.0.1:8000/api/category/${id}`)

    const payload = Object.keys(res.data.tasks).map(key => {
      return {
        ...res.data.tasks[key],
      }
    })
    dispatch({type: FETCH_NOTES, payload})
  }


  const addNote = async (title, id) => {

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

  const removeNote = async id => {
    await axios.delete(`http://127.0.0.1:8000/api/task/${id}`)

    dispatch({
      type: REMOVE_NOTE,
      payload: id
    })
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
