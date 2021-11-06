import * as actions from './actionTypes';

export const registerRequest = (user,history) => async (dispatch,getState,{getFirebase,getFirestore})  => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const {email,password,userName} = user;
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((res) => {
        firestore.collection('users').doc(res.user.uid).set({
            avatar:'',
            email,
            userName,
            phoneNumber:""
        }).then(() => {
            dispatch(registerSuccess(history))
        });
    })
    .catch(err => dispatch(registerFailure(err)))
}

const registerFailure = (err) => {
    return {
        type: actions.REGISTER_FAILURE,
        payload: err.message
    }
}

const registerSuccess = (history) => {
    history.goBack();
    return{
        type: actions.REGISTER_SUCCESS
    }
}

export const hideregisterError = () => {
    return {
        type: actions.HIDE_REGISTER_ERROR,
    }
}