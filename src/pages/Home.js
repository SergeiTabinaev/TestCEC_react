import React, {useContext, useEffect} from "react";
import {Sidebar} from "../components/Sidebar";
import {DjserverContext} from "../context/djangoserver/djserverContext";


export const Home = () => {

    const {fetchCats, cats} = useContext(DjserverContext)


    useEffect(() => {
        fetchCats()
        // eslint-disable-next-line
    }, [])

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-3 mt-5">
                    <Sidebar fetchCats={fetchCats} cats={cats}/>
                </div>
            </div>
        </div>
    )
}
