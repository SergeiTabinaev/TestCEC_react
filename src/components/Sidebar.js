import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
// import {DjserverContext} from "../context/djangoserver/djserverContext";
// import {Form} from "./Form";
// import {Loader} from "./Loader";
// import {Notes} from "./Notes";


export const Sidebar = () => {
    const [cats, setCats] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/category/"
            }).then(response => {
                setCats(response.data)
        })
    }, [])




    return(
        <div>
            <div className="list-group">
                {cats.map(c => (
                <Link className="list-group-item" exact to={{pathname: `/category/${c.id}/`, fromDashboard: false}}>{c.name}</Link>
                    ))}
            </div>

        </div>
    )
}







//     const {loading, notes, fetchNotes, removeNote} = useContext(DjserverContext)
//
//     useEffect(() => {
//         fetchNotes()
//         // eslint-disable-next-line
//     }, [])
//
//     return (
//         <div className="row">
//             <div className="col-lg-3 mt-5">
//                 <Sidebar/>
//             </div>
//             <div className="row">
//                 <Fragment>
//                     <Form />
//
//                     <hr/>
//
//                     {loading
//                         ? <Loader />
//                         : <Notes notes={notes} onRemove={removeNote} />
//                     }
//                 </Fragment>
//             </div>
//         </div>
//     )


