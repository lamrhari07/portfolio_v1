import {
    UserActionTypes,
    ActionTypes,
    ACTION_FAILED,
    ACTION_LOAD,
    ACTION_USER_LOGIN,
    ACTION_USER_LOGOUT,
    ACTION_USER_UPDTED,
    ACTION_SUCCESS,
    ACTION_USER_FETCH,
    ACTION_PROJECT_FETCH,
    ACTION_PROJECT_CREACT,
    ACTION_PROJECT_DELETE
} from './ActionTypes'
import { IState, IProject, IUser } from "../utils/Interface";


export const LoadFunction = (): ActionTypes => { // Action Function For Loading;
    return {
        type: ACTION_LOAD,
    }
}

export const SuccessFunction = (data?: IState): ActionTypes => { // Action Function For Fetching;
    return {
        type: ACTION_SUCCESS,
        payload: data
    }
}

export const FetchProjectFunction = (data: IProject): ActionTypes => { // Action Function For Fetching;
    return {
        type: ACTION_PROJECT_FETCH,
        payload: {
            project: data
        }
    }
}

export const CreateProjectFunction = (data?: IProject): ActionTypes => { // Action Function For Fetching;
    return {
        type: ACTION_PROJECT_CREACT,
        payload: {
            project: data
        }
    }
}

export const UpdateProjectFunction = (data: IProject): ActionTypes => { // Action Function For Fetching;
    return {
        type: ACTION_USER_UPDTED,
        payload: {
            project: data
        }
    }
}

export const DeleteProjectFunction = (data: IProject): ActionTypes => { // Action Function For Deleting projects;
    return {
        type: ACTION_PROJECT_DELETE,
        payload: {
            project: data
        }
    }
}

export const LoginFunction = (): UserActionTypes => { // Action Function For Loading;
    return {
        type: ACTION_USER_LOGIN,
    }
}

export const LogoutFunction = (): ActionTypes => { // Action Function For Fetching;
    return {
        type: ACTION_USER_LOGOUT,
    }
}

export const FetchUserFunction = (data: IUser): ActionTypes => { // Action Function For Fetching;
    return {
        type: ACTION_USER_FETCH,
        payload: {
            user: data
        }
    }
}

export const UpdateUserFunction = (data: IUser): ActionTypes => { // Action Function For Fetching;
    return {
        type: ACTION_USER_UPDTED,
        payload: {
            user: data
        }
    }
}

export const FailFunction = (data: IState): ActionTypes => { // Action Function For Fail Situation;
    return {
        type: ACTION_FAILED,
        payload: {
            error: data
        }
    }
}