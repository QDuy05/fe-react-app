import { GET_LOCATION, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR } from "../actions/locationAction";

const INITIAL_STATE = {
    locationData: [],
    isLoading: false,
    isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_LOCATION:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };

        case GET_LOCATION_SUCCESS:
            console.log('>>> check action: ', action);
            return {
                ...state,
                locationData: action.data.data
            };
        case GET_LOCATION_ERROR:
            console.log('1');
            return {
                ...state,
            };
        default: return state;

    }

};
export default userReducer;