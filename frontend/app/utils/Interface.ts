import { ComponentType, ReactNode } from 'react';
import { RouteComponentProps, RouteChildrenProps } from "react-router-dom";

export interface IProject {
    user?: string
    name?: string
    language?: string
    description?: string
    git_url?: string
}

export interface IUser {
    username: string
    email: string
    first_name: string
    last_name: string
    avatar?: File | null
    birth_date?: Date
    gender?: number
    phone?: number
    description?: string
    introduction?: string
    projects?: IProject[]
}

// Define state interface;
export interface IState {
    isLoading?: boolean
    isAuthenticated?: boolean
    user?: IUser | IUser[]
    project?: IProject | IProject[]
    error?: any
}


// Define Reducer Interface;
export interface IReducer {
    state?: IState
    project?: IProject | IProject[]
}

// Define Route Interface;
export interface IRoute {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>
    render?: ((props: RouteComponentProps<any>) => ReactNode)
    children?: ((props: RouteChildrenProps<any>) => ReactNode) | ReactNode
    path?: string | string[]
    exact?: boolean
    sensitive?: boolean
    strict?: boolean
    auth?: boolean
}

// Define generic Action interface; 
export interface IAction<T, P> {
    readonly type: T;
    readonly payload?: P;
}