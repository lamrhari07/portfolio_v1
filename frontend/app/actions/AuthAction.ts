import { Dispatch } from "redux";
import axios from 'axios';
import { ActionTypes } from './ActionTypes'
import {
    FailFunction,
    LoadFunction,
    LoginFunction,
    UpdateUserFunction,
    SuccessFunction,
    FetchUserFunction, LogoutFunction
} from "./ActionFunctions";
import { IUser } from "../utils/Interface";


// Action For The Authentication (SignIn, SignUP) Process.
export const authenticationAction = (inputs: object, path: string, history: any): (dispatch: Dispatch<ActionTypes>) => Promise<void> => {
    let URL = `http://0.0.0.0:8000/${path}`;
    return async (dispatch) => {
        try {
            dispatch(LoadFunction())
            const data = await axios.post(URL, inputs)
            dispatch(LoginFunction())
            localStorage.setItem("id_token", data.data.token);
            dispatch(SuccessFunction())
            history.push('/dash')
        } catch (error) {
            dispatch(FailFunction(error.response?.data))
        }
    }
}

// Action For Logging Out.
export const UserLogOut = (): (dispatch: Dispatch<ActionTypes>) => Promise<void> => {
    let URL = `http://0.0.0.0:8000/auth/logout`;
    return async (dispatch) => {
        try {
            dispatch(LoadFunction())
            await axios.post(URL, {
                headers: {
                    "Authorization": `JWT ${localStorage.getItem("id_token")}`
                }
            }).then(() => {
                dispatch(LogoutFunction())
            }).then(() => {
                localStorage.removeItem("id_token")
                window.location.replace('/')
            })
        } catch (error) {
            // If request is bad...
            // Show an error to the user   
            dispatch(FailFunction(error.response?.data))

        }
    }
}

// Action For Fetch User Data Process.
export const fetchUserProfileAction = (): (dispatch: Dispatch<ActionTypes>) => Promise<void> => {
    const URL = 'http://0.0.0.0:8000/auth/profile';
    const token = localStorage.getItem('id_token')

    return async (dispatch) => {
        try {
            dispatch(LoadFunction())
            const data = await axios.get(URL, {
                headers: {
                    "Authorization": `JWT ${token}`
                }
            })
            dispatch(SuccessFunction())
            dispatch(FetchUserFunction(data.data))
        } catch (error) {
            // if (error.response?.status == 401){
            //     localStorage.removeItem('id_token')
            // }
            dispatch(FailFunction(error.response?.data))
        }
    }
}

// Action For Fetch User Data Process.
export const fetchUserAction = (user?: string): (dispatch: Dispatch<ActionTypes>) => Promise<void> => {
    const URL = `http://0.0.0.0:8000/auth/user${user}`;
    return async (dispatch) => {
        dispatch(LoadFunction())
        try {
            await axios.get(URL)
                .then((res: any) => {
                    dispatch(FetchUserFunction(res.data))
                })
        } catch (error) {
            dispatch(FailFunction(error.response?.data))
        }
    }
}

// Action For Update User Info Process.
export const UserUpdateAction = (inputs: IUser | any): (dispatch: Dispatch<ActionTypes>) => Promise<void> => {
    let URL = 'http://0.0.0.0:8000/auth/profile';
    const token = localStorage.getItem('id_token')

    let formData = new FormData();

    inputs.avatar && formData.append('avatar', inputs.avatar)
    formData.append('first_name', inputs.first_name)
    formData.append('last_name', inputs.last_name)
    formData.append('birth_date', inputs.birth_date)
    formData.append('gender', inputs.gender)
    formData.append('phone', inputs.phone)
    formData.append('description', inputs.description)
    formData.append('introduction', inputs.introduction)

    return async (dispatch) => {
        try {
            dispatch(LoadFunction())
            await axios({
                method: 'PUT',
                url: URL,
                data: formData,
                headers: {
                    'Authorization': `JWT ${token}`,
                    'Content-Type': `multipart/form-data`,
                },
            }).then((data: any) => {
                dispatch(SuccessFunction())
                dispatch(UpdateUserFunction(data.data))
            }).finally(() => alert('Your information has been updated'))
        } catch (error) {
            console.log(error.response?.data);
            dispatch(FailFunction(error.response?.data))
        }
    }
}