import { Reducer } from "redux";
import {
    ActionTypes,
    ACTION_LOAD,
    ACTION_SUCCESS,
    ACTION_FAILED,
    ACTION_USER_LOGIN,
    ACTION_USER_LOGOUT,
    ACTION_USER_UPDTED,
    ACTION_USER_FETCH,
    ACTION_PROJECT_FETCH,
    ACTION_PROJECT_CREACT,
    ACTION_PROJECT_DELETE, ACTION_PROJECT_UPDTED
} from "../actions/ActionTypes";
import { IState } from "../utils/Interface";


const initState: IState = {
    isLoading: false,
    isAuthenticated: false,
    user: [],
    project: [],
    error: []
}

export const MainReducer: Reducer<IState, ActionTypes> = (state = initState, action: ActionTypes): IState => {
    switch (action.type) {
        case ACTION_LOAD: {
            return { ...state, isLoading: true }
        };
        case ACTION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            }
        };
        case ACTION_USER_LOGIN: {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true
            }
        };
        case ACTION_USER_LOGOUT: {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false
            }
        };
        case ACTION_USER_FETCH: {
            return {
                ...state,
                isLoading: false,
                user: action.payload?.user
            }
        };
        case ACTION_USER_UPDTED: {
            return {
                ...state,
                isLoading: false,
                user: action.payload?.user,
            }
        }
        case ACTION_FAILED: {
            return {
                ...state,
                isLoading: false,
                error: action.payload?.error
            }
        };
        case ACTION_PROJECT_FETCH: {
            return {
                ...state,
                isLoading: false,
                project: action.payload?.project
            };
        };
        case ACTION_PROJECT_CREACT: {
            function insertItem(array: any, action: any) {
                return [
                    ...array.slice(0, action),
                    action,
                    ...array.slice(action)
                ]
            }
            return {
                ...state,
                isLoading: false,
                project: insertItem(state.project, action.payload?.project)
            };
        };
        case ACTION_PROJECT_UPDTED: {
            return {
                ...state,
                isLoading: false,
                project: action.payload?.project
            };
        };
        case ACTION_PROJECT_DELETE: {
            function removeItem(array: any, action: any) {
                return array.filter((item:any) => item !== action)
            };
            return {
                ...state,
                isLoading: false,
                project: removeItem(state.project, action.payload?.project)
            };
        };
        default: return state
    }
}