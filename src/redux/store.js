import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
import {getFirestore, reduxFirestore} from 'redux-firestore';
import {getFirebase} from 'react-redux-firebase'
import firebase from '../firebase/config';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), reduxFirestore(firebase)),
);

export default store;