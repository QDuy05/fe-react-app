import { getAllLocation } from "../../services/locationService";

export const GET_LOCATION = 'GET_LOCATION';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_ERROR = 'GET_LOCATION_ERROR';

export const handleGetLocation = (token) => {
    return async (dispatch, getState) => {
        dispatch({ type: GET_LOCATION })

        let response = await getAllLocation(token)
        if (response && response.status === 200) {
            dispatch({
                type: GET_LOCATION_SUCCESS,
                data: response.data
            })
        } else {
            dispatch({
                type: GET_LOCATION_ERROR,
            })
        }
    }
}