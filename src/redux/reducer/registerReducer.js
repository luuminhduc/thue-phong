import * as actions from '../action/registerAction/actionTypes';

const initialState = {
    registerError:'',
}

export default function registerReducer(state=initialState,action) {
    const {type, payload} = action;
    switch(type) {
        case actions.REGISTER_FAILURE: return {...state,registerError:payload}
        case actions.REGISTER_SUCCESS: case actions.HIDE_REGISTER_ERROR: return{...state,registerError:''};
        default: return state;
    }
}