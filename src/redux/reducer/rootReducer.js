import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import placeReducer from "./placeReducer";
import modalReducer from './modalReducer';

export default combineReducers({
    firebaseReducer,
    loginReducer,
    registerReducer,
    placeReducer,
    modalReducer
})