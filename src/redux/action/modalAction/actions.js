import * as actions from './actionTypes';

export const showModal = (modal) => {
    return{
        type: actions.SHOW_MODAL,
        payload:modal
    }
}

export const hideModal = () => {
    return {
        type: actions.HIDE_MODAL,
        
    }
}