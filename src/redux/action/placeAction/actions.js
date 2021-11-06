import * as actions from './actionTypes';
import {storage, timeStamp} from '../../../firebase/config';
import axiox from "axios";


export const addNewPlace = (newPlace,history) => async (dispatch,getState,{getFirestore})  => {
    const firestore = getFirestore();
    const {photos} = newPlace;


    const newArr = [];

    const addToFireStorage = (currentImage) =>{
        const storageRef = storage.ref(currentImage.name);
        storageRef.put(currentImage).on('state_changed', (snap) => {

        }, (err) => {
            console.log("Storage Error: "+err);                   

        }, async () => {
            const url = await storageRef.getDownloadURL();
            newArr.push(url);
            if(newArr.length === photos.length) {
                const place = {...newPlace, photos: newArr,rating:[],time:timeStamp()};
                firestore.collection('places').add(place).then(() => {
                    history.push('/');
                }).catch(err => {
                    
                    console.log(err);
                })
            }
        })
    }

    for(let i = 0; i < photos.length; i++) {
         addToFireStorage(photos[i]);
    }

}

export const fetchPlaces = (newPlace,history) => async (dispatch,getState,{getFirestore})  => {
    const firestore = getFirestore();
    firestore.collection("places").orderBy('time', "desc").onSnapshot(snap => {
        const arr = [];
        snap.forEach(doc => arr.push({...doc.data(), id:doc.id}));
        dispatch({
            type: actions.FETCH_PLACES,
            payload:arr,
        })
    })
}

export const fetchVietNamInfo = () => dispatch => {
    axiox.get("https://provinces.open-api.vn/api/?depth=3").then((data) => {
        dispatch({
            type: actions.FETCH_VIET_NAME_INFO,
            payload: data,
        })
      });
}