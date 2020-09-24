import React, { FC, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Define Containers.
import Home from '../containers/main_page/';
import Authentication from '../containers/auth_page';
import Dashboard from '../containers/dashboard';
import Portfolio from '../containers/portfolio';

// Define components.
import { PrivateRoute, PublicRoute } from '../../utils/RouteComponents';
import PageNotFound from './PageNotFound';

// Define Layout component interface; 
interface LayoutProps {
    auth?: boolean
}

const Layout: FC<LayoutProps> = ({ auth }) => {

    return (
        <Fragment>
            <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/portfolio/:username' exact component={Portfolio} />
                    <PublicRoute path='/login' component={Authentication} auth={auth} />
                    <PrivateRoute path='/dash' component={Dashboard} auth={auth} />
                    <Route path='*' exact component={PageNotFound} />
                </Switch>
        </Fragment >
    )
}

export default Layout;