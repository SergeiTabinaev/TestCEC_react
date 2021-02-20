import React, {useContext} from "react"
import {Sidebar} from "../components/Sidebar"
import {DjserverContext} from "../context/djangoserver/djserverContext"
import {Link} from "react-router-dom"

export const Home = () => {
    const {fetchCats, cats} = useContext(DjserverContext)

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-3 mt-5">
                    <Sidebar fetchCats={fetchCats} cats={cats}/>
                </div>

                <div className='jumbotron mt-5'>
                    <h1 className='display-4'>Welcome to Auth System!</h1>
                    <p className='lead'>This is an incredible authentication system with production level features!</p>
                    <hr className='my-4'/>
                    <p>Click the Log In button</p>
                    <Link class='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
                </div>

            </div>
        </div>
    )
}




