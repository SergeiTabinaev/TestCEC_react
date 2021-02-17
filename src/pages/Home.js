import React from "react";
import {Sidebar} from "../components/Sidebar";


export const Home = () => {

    return(
        <div className="container">

            <div className="row">
                <div className="col-lg-3 mt-5">
                    <Sidebar/>
                </div>
            </div>
        </div>
    )
}
