import React from 'react'

import {Route,Switch, Redirect,useLocation} from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Movies from '../pages/Movies'
import TVSeries from '../pages/TVSeries'
import Search from '../pages/Search'
const Routes = () => {
    const location = useLocation()
    return (
        <Switch location={location} key={location.pathname}>
            <Route 
                path='/'
                exact
                component={Home}
            />

            <Route 
                path='/movie'
                exact
                component={Movies}
            />
            <Route 
                path='/movie/:genreIdUrl'
                exact
                render = {(props)=> <Catalog {...props} />}
            />
            <Route 
                path='/tv/:genreIdUrl'
                exact
                render = {(props)=> <Catalog {...props} />}
            />
            <Route 
                path='/tv'
                exact
                component={TVSeries}
            />
            <Route 
                path='/search/:keyword'
                exact
                component={Search}
            />
            <Route path="*">
                <Redirect to="/" />
            </Route>
        </Switch>
    )
}

export default Routes