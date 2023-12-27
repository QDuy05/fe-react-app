
import { combineReducers } from "redux";
import userReducer from './userReducer'
import locationReducer from './locationReducer'
import portReducer from "./portReducer";

const rootReducer = combineReducers({
    user: userReducer,
    location: locationReducer,
    port: portReducer
})
export default rootReducer; 