import React, {useState, useEffect, useContext} from 'react'
import {AlertContext} from '../context/alert/alertContext'
import {DjserverContext} from '../context/djangoserver/djserverContext'


export const Form = () => {

  const [value, setValue] = useState('')
  const alert = useContext(AlertContext)
  const djserver = useContext(DjserverContext)

  const map = djserver.notes[0]
  // const map = djserver.cats.map

  const submitHandler = event => {
    event.preventDefault()

    if (value.trim()) {
      djserver.addNote(value.trim(), map.category).then(() => {
        alert.show('Заметка была создана', 'success')
      }).catch(() => {
        alert.show('Что-то пошло не так', 'danger')
      })
      setValue('')
    } else {
      alert.show('Введите название заметки')
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Введите название заметки"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
    </form>
  )
}
