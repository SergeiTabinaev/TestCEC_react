import React, {useEffect} from "react"
import {Link} from "react-router-dom"

export const Sidebar = ({fetchCats, cats}) => {

    useEffect(() => {
        fetchCats()
        // eslint-disable-next-line
    }, [])

        return (
            <div>
                <div className="list-group">
                    {cats.map(c => (
                        <Link className="list-group-item" exact
                              to={{pathname: `/category/${c.id}/`, fromDashboard: false}}>{c.name}</Link>
                    ))}
                </div>
            </div>
        )
}

