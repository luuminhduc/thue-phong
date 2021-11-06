import * as actions from '../action/loginAction/actionTypes';

const initialState = {
    loginError:'',
    currentUser:null,
}

export default function loginReducer(state=initialState,action) {
    const {type, payload} = action;
    switch(type) {
        case actions.LOGIN_FAILURE: return {...state,loginError:payload}
        case actions.LOGIN_SUCCESS: case actions.HIDE_LOGIN_ERROR: return{...state,loginError:''};
        case actions.GET_CURRENT_USER:return {...state,currentUser:payload};
        default: return state;
    }
}