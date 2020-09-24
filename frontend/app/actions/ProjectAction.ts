import { Dispatch } from "redux";
import axios from 'axios';
import { ActionTypes, ACTION_LOAD, ACTION_SUCCESS, ACTION_FAILED } from './ActionTypes'
import { IProject, IState, IUser } from "../utils/Interface";
import { SuccessFunction, FetchProjectFunction, CreateProjectFunction, DeleteProjectFunction, UpdateProjectFunction } from './ActionFunctions';


export const LoadFunction = (): ActionTypes => { // Action Function For Loading;
    return {
        type: ACTION_LOAD,
    }
}

export const FetchFunction = (data: IUser): ActionTypes => { // Action Function For Fetching;
    return {
        type: ACTION_SUCCESS,
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

export const fetchUserProjectsAction = (): (dispatch: Dispatch<ActionTypes>) => Promise<void> => {
    const URL = 'http://0.0.0.0:8000/project';
    const token = localStorage.getItem('id_token')

    return async (dispatch) => {
        try {
            dispatch(LoadFunction())
            const data = await axios.get(URL, {
                headers: token && {
                    "Authorization": `JWT ${token}`
                }
            })
            dispatch(FetchProjectFunction(data.data))
        } catch (error) {
            if (error.response?.status == 401) { localStorage.removeItem('id_token') }
            dispatch(FailFunction(error.response?.data))
        }
    }
}

export const CreateProjectAction = (inputs: object): (dispatch: Dispatch<ActionTypes>) => Promise<void> => {
    let URL = 'http://0.0.0.0:8000/project/create';
    const token = localStorage.getItem('id_token')
    return async (dispatch) => {
        try {
            dispatch(LoadFunction())
            const data = await axios.post(URL, {
                ...inputs
            }, {
                headers: {
                    "Authorization": `JWT ${token}`
                }
            })
            dispatch(CreateProjectFunction(data.data))
            dispatch(SuccessFunction())
        } catch (error) {
            if (error.response?.status == 401) { localStorage.removeItem('id_token') }
            console.log(error.response?.data);
            dispatch(FailFunction(error.response?.data))
        }
    }
}

export const UpdateProjectAction = (inputs: object, project:string): (dispatch: Dispatch<ActionTypes>) => Promise<void> => {
    let URL = `http://0.0.0.0:8000/project/detail/${project}`;
    const token = localStorage.getItem('id_token')
    return async (dispatch) => {
        try {
            dispatch(LoadFunction())
            const data = await axios.put(URL, {
                ...inputs
            }, {
                headers: {
                    "Authorization": `JWT ${token}`
                }
            })
            dispatch(UpdateProjectFunction(data.data))
        } catch (error) {
            if (error.response?.status == 401) { localStorage.removeItem('id_token') }
            console.log(error.response?.data);
            dispatch(FailFunction(error.response?.data))
        }
    }
}

export const fetchProjects = (): (dispatch: Dispatch<ActionTypes>) => Promise<void> => {
    const URL = 'http://0.0.0.0:8000/project/';
    return async (dispatch) => {
        try {
            dispatch(LoadFunction())
            const data = await axios.get(URL)
            dispatch(SuccessFunction(data.data))
        } catch (error) {
            dispatch(FailFunction(error))
        }
    }
}

export const DeletProjects = (project: IProject): (dispatch: Dispatch<ActionTypes>) => Promise<void> => {
    const URL = `http://0.0.0.0:8000/project/detail/${project.name}`;
    const token = localStorage.getItem('id_token');

    return async (dispatch) => {
        try {
            dispatch(LoadFunction())
            await axios.delete(URL, {
                headers: {
                    "Authorization": `JWT ${token}`
                }
            }).then(res => {
                dispatch(DeleteProjectFunction(project));
                dispatch(SuccessFunction());
            })
        } catch (error) {
            if (error.response?.status == 401) { localStorage.removeItem('id_token') }
            console.log(error.response?.data);
            dispatch(FailFunction(error))
        }
    }
}