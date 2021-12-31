import React from 'react'

import {Route,Switch} from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Movies from '../pages/Movies'
import TVSeries from '../pages/TVSeries'
import Search from '../pages/Search'
const Routes = () => {
    return (
        <Switch >
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
                component={Catalog}
            />
            <Route 
                path='/tv/:genreIdUrl'
                exact
                component={Catalog}
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
        </Switch>
    )
}

export default Routes