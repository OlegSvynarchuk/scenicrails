import React from 'react'
import {NavLink} from 'react-router-dom'

import './navbar.css'

export default function Navbar() {
    return (
        <div className='navbar'>
            <p><NavLink exact to='/routesloader'>Add route and stations</NavLink></p>
            <p><NavLink to='/singleroute'>View route</NavLink></p>
            <p><NavLink to='/frontpage'>View our front page</NavLink></p>
        </div>
    )
}
