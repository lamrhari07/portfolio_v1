import React, { ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IRoute } from './Interface';



export const PrivateRoute: ComponentType<IRoute> = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            strict
            {...rest}
            render={props =>
                rest.auth ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
};

export const PublicRoute: ComponentType<IRoute> = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            exact
            render={props =>
                !rest.auth ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/dash",
                            }}
                        />
                    )
            }
        />
    );
};