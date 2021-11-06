import * as actions from '../action/modalAction/actionTypes';

const initialState = {
    active: false,
    title:"",
    content:"",
    callback:null
}

export default function modalReducer(state=initialState, action) {
    const {type, payload} = action;
    switch(type){
        case actions.HIDE_MODAL:return initialState;
        case actions.SHOW_MODAL:return{...state,active:true,...payload};
        default: return state;
    }
}