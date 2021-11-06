import * as actions from './actionTypes';

export const loginRequest = (user,history) => async (dispatch,getState,{getFirebase})  => {
    const firebase = getFirebase();
    const {email,password} = user;
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(() => dispatch(loginSuccess(history)))
    .catch(err => dispatch(loginFailure(err)))
}

const loginFailure = (err) => {
    console.log(err);
    return {
        type: actions.LOGIN_FAILURE,
        payload: err.message
    }
}

const loginSuccess = (history) => {
    history.goBack();
    return{
        type: actions.LOGIN_SUCCESS
    }
}

export const hideLoginError = () => {
    return {
        type: actions.HIDE_LOGIN_ERROR,
    }
}

export const logout =  () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
    .catch(err => {
        console.log(err);
    })
}

export const getCurrentUser = (uid) => (dispatch, getState, {getFirebase,getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('users').doc(uid).get()
    .then(data => {
        dispatch({
            type: actions.GET_CURRENT_USER,
            payload: {...data.data(), id:data.id}
        })
    })
    .catch(err => {
        console.log(err)
    })
}