import { IState, IAction, IProject, IUser } from "../utils/Interface";

// Define Action types;
export const ACTION_LOAD = 'ACTION_LOAD';
export const ACTION_SUCCESS = 'ACTION_SUCCESS';
export const ACTION_FAILED = 'ACTION_FAILED';

// Define Authentication types;
export const ACTION_USER_FETCH = 'ACTION_USER_FETCH';
export const ACTION_USER_LOGIN = 'ACTION_USER_LOGIN';
export const ACTION_USER_LOGOUT = 'ACTION_USER_LOGOUT';
export const ACTION_USER_UPDTED = "ACTION_USER_UPDTED";

// Define Project types;
export const ACTION_PROJECT_FETCH = 'ACTION_PROJECT_FETCH';
export const ACTION_PROJECT_CREACT = "ACTION_PROJECT_CREACT";
export const ACTION_PROJECT_UPDTED = "ACTION_PROJECT_UPDTED";
export const ACTION_PROJECT_DELETE = 'ACTION_PROJECT_DELETE';

// Define Types;
export type LoadAction = IAction<typeof ACTION_LOAD, IState>;
export type SuccessAction = IAction<typeof ACTION_SUCCESS, IState>;
export type FailAction = IAction<typeof ACTION_FAILED, IState>;

export type LoginAction = IAction<typeof ACTION_USER_LOGIN, IState>;
export type LogoutAction = IAction<typeof ACTION_USER_LOGOUT, IState>;
export type UserFetchAction = IAction<typeof ACTION_USER_FETCH, IState>;
export type UserUpdateAction = IAction<typeof ACTION_USER_UPDTED, IState>;

export type ProjectFetchAction = IAction<typeof ACTION_PROJECT_FETCH, IState>;
export type ProjectCreateAction = IAction<typeof ACTION_PROJECT_CREACT, IState>;
export type ProjectUpdateAction = IAction<typeof ACTION_PROJECT_UPDTED, IState>;
export type ProjectDeleteAction = IAction<typeof ACTION_PROJECT_DELETE, IState>;


export type ActionTypes = (
    LoadAction | SuccessAction |
    LoginAction | LogoutAction |
    UserUpdateAction | FailAction | 
    UserFetchAction | ProjectFetchAction |
    ProjectCreateAction | ProjectUpdateAction |
    ProjectDeleteAction
);

export type UserActionTypes = LoadAction | UserFetchAction |LoginAction | LogoutAction | UserUpdateAction | SuccessAction | FailAction;