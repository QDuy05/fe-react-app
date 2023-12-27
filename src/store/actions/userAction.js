import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const USER_REFRESH = 'USER_REFRESH';

export const handleLoginRedux = (username, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN })

        let response = await loginUser(username, password)
        if (response && response.status === 200) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', username)
            localStorage.setItem('role', response.data.role)
            dispatch({
                type: FETCH_USER_SUCCESS,
                data: {
                    username,
                    token: response.data.token,
                    role: response.data.role
                }
            });

        } else {
            toast.error(response.data.msg)
            dispatch({
                type: FETCH_USER_ERROR,
            });
        }
    }
}

export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGOUT
        })
    }
}

export const handleRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH
        })
    }
}
