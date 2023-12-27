import { getAllPort } from "../../services/locationService";

export const GET_PORT = 'GET_PORT';
export const GET_PORT_SUCCESS = 'GET_PORT_SUCCESS';
export const GET_PORT_ERROR = 'GET_PORT_ERROR';

export const handleGetPort = (token) => {
    return async (dispatch, getState) => {
        dispatch({ type: GET_PORT })

        let response = await getAllPort(token)
        if (response && response.status === 200) {
            dispatch({
                type: GET_PORT_SUCCESS,
                data: response.data
            })
        } else {
            dispatch({
                type: GET_PORT_ERROR,
            })
        }
    }
}