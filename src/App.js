import React from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import firebase from 'firebase';
import config from './firebase/config';
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './pages/Home';
import Container from './components/Container';
import Register from './pages/Register';
import Login from './pages/Login';
import Account from './pages/Account';
import AddPlace from './pages/AddPlace';
import SearchResults from './pages/SearchResults';
import SinglePlace from './pages/SinglePlace';

const rrfProps = {
  firebase,
  config,
  dispatch:store.dispatch
}

const AuthIsLoaded = ({children}) => {
  const auth = useSelector(state=>state.firebaseReducer.auth);
  if(!isLoaded(auth)) return "";
  return children;
}

const App = () => {

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Container>
              
              <Home/>
              </Container>
              </Route>  
              <Route exact path="/register">
                <Container>
                <Register/>
                </Container>
              </Route>  
              <Route exact path="/login">
                <Container>
                <Login/>
                </Container>
             
              </Route>  
              <Route exact path="/account/:accountPath">
                <Container>
                <Account/>
                </Container>
              </Route>  
              <Route exact path="/addPlace">
                <Container>
                <AddPlace/>
                </Container>
              </Route> 
              <Route exact path="/search">
                <Container>
                <SearchResults/>
                </Container>
              </Route> 
              <Route exact path="/place/:placeId">
                <Container>
                <SinglePlace/>
                </Container>
              </Route> 
          </Switch>
          </BrowserRouter>
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
 
export default App;