import React, {Fragment, useContext, useEffect} from "react";
import {Sidebar} from "../components/Sidebar";
import {Form} from '../components/Form'
import {Notes} from '../components/Notes'
import {DjserverContext} from '../context/djangoserver/djserverContext'
import {Loader} from '../components/Loader'

// вывод списка тасок определенной категории
export const CategoryDetail = ({match}) => {

    const {loading, notes, fetchNotes, removeNote, fetchCats, cats} = useContext(DjserverContext)
    const id = match.params.id

    useEffect(() => {
      fetchNotes(id)
      // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        fetchCats()
        // eslint-disable-next-line
    }, [])

    return (
            <div className="row">
                <div className="col-lg-3 mt-5">
                    <Sidebar fetchCats={fetchCats} cats={cats}/>
                </div>
                <div className="col-lg-9">
                        <Fragment>
                          <Form />
                          <hr/>

                          {loading
                            ? <Loader />
                            : <Notes notes={notes} onRemove={removeNote}/>
                          }
                        </Fragment>
                </div>
            </div>
      )
}
