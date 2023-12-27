import { FETCH_USER_ERROR, FETCH_USER_LOGIN, FETCH_USER_SUCCESS, USER_LOGIN, USER_LOGOUT, USER_REFRESH } from "../actions/userAction";

const INITIAL_STATE = {
    auth: {
        username: '',
        token: '',
        auth: null,
        role: '',
    },
    isLoading: false,
    isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FETCH_USER_LOGIN:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };

        case FETCH_USER_SUCCESS:
            console.log('>>> check action: ', action);
            return {
                ...state,
                auth: {
                    username: action.data.username,
                    token: action.data.token,
                    auth: true,
                    role: action.data.role
                }


            };
        case FETCH_USER_ERROR:
            console.log('1');
            return {
                ...state,
                auth: {
                    auth: false
                }

            };
        case USER_LOGOUT:
            localStorage.removeItem('username')
            localStorage.removeItem('token')

            return {
                ...state,
                auth: {
                    username: '',
                    token: '',
                    auth: false,
                    role: '',
                }

            };
        case USER_REFRESH:
            return {
                ...state,
                auth: {
                    username: localStorage.getItem('username'),
                    token: localStorage.getItem('token'),
                    auth: true,
                    role: localStorage.getItem('role'),
                }

            };

        default: return state;

    }

};

export default userReducer;