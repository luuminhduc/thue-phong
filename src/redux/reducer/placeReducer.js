import * as actions from '../action/placeAction/actionTypes';

const initialState = {
    listOfPlaces:[],
    vietNamInfo:[],
}

export default function placeReducer(state=initialState, action) {
    const {type, payload} = action;
    switch(type){
        case actions.FETCH_PLACES:return {...state,listOfPlaces:payload};
        case actions.FETCH_VIET_NAME_INFO: return{...state,vietNamInfo:payload?.data};
        default: return state;
    }
}