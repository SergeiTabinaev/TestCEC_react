import React, {Fragment, useContext, useEffect} from "react";
import {Sidebar} from "../components/Sidebar";
import {Form} from '../components/Form'
import {Notes} from '../components/Notes'
import {DjserverContext} from '../context/djangoserver/djserverContext'
import {Loader} from '../components/Loader'

// вывод списка тасок определенной категории
export const CategoryDetail = ({match}) => {

    const {loading, notes, fetchNotes, removeNote} = useContext(DjserverContext)
    const id = match.params.id

    useEffect(() => {
      fetchNotes(id)
      // eslint-disable-next-line
    }, [id])

    return (
            <div className="row">
                <div className="col-lg-3 mt-5">
                    <Sidebar/>
                </div>
                <div className="col-lg-9">
                        <Fragment>
                          <Form />

                          <hr/>

                          {loading
                            ? <Loader />
                            : <Notes notes={notes} onRemove={removeNote} />
                          }
                        </Fragment>
                </div>
            </div>

      )
}

// {match}
//     const [category, setCategory] = useState({})
//     const [products, setProducts] = useState([])
//     const id = match.params.id
//
//     useEffect(() => {
//         axios({
//             method: "GET",
//             url: `http://127.0.0.1:8000/api/category/${id}/`
//         }).then(response => {
//             setCategory(response.data)
//             setProducts(response.data.products)
//         })
//         }, [id])
