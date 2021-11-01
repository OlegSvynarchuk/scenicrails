import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import RoutesLoader from './components/admin/routesLoader.jsx'


import Navbar from './components/admin/navbar.jsx'
import FrontPage from './components/production/frontpage/index.jsx'







export default function App() {
    return (
    <>
      <Navbar />    
     
      <Switch>
          <Route exact path='/'>
              <Redirect to='/home'/>
          </Route>
          
          <Route path='/home'>
                <FrontPage />
          </Route>
          <Route  path='/routesloader'>
              <RoutesLoader />
          </Route>
          
          
         
      </Switch>  
</>        
    )
}
