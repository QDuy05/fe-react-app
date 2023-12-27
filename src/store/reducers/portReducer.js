import { GET_PORT, GET_PORT_SUCCESS, GET_PORT_ERROR } from "../actions/portAction";

const INITIAL_STATE = {
    portData: [],
    isLoading: false,
    isError: false,
};

const renameKey = (obj, oldKey, newKey) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}
const newData = (data) => {
    const arr = data;
    arr.forEach(obj => {
        renameKey(obj, 'code', 'value')
        renameKey(obj, 'name', 'label')
    });
    console.log('updt', arr);
    return arr;
}

const portReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_PORT:
            return {
                ...state,
                isLoading: true,
            };

        case GET_PORT_SUCCESS:
            console.log('>>> check action: ', action);
            return {
                ...state,
                portData: newData(action.data.data)
            };
        case GET_PORT_ERROR:
            console.log('1');
            return {
                ...state,
                isError: true,
            };
        default: return state;
    }

};
export default portReducer;