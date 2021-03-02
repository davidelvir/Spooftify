import './App.css';
import { BrowserRouter, Switch } from "react-router-dom";
import RedirectPage from './components/RedirectPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import MyLibrary from "./components/MyLibrary/MyLibrary";
import AuthRoute from "./components/AuthRoute";
import {Provider, connect} from "react-redux";
import { applyMiddleware } from "redux";
import reducer from "./store/reducer";
import { createStore } from "redux";
import { appMiddleware } from "./middlewares/app";
import { apiMiddleware } from "./middlewares/core";
import { useState, useEffect } from 'react';
import {LOGOUT} from "./actions/auth";

const createStoreWithMiddleware = applyMiddleware(
    appMiddleware,
    apiMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

function App(props) {
    const state = useState( { expiryTime: '0' } );
    useEffect(()=>{
        let expiryTime;
        try {
            expiryTime = JSON.parse(localStorage.getItem('expires_in'));
            localStorage.setItem('validSession', expiryTime);
        } catch (error) {
            expiryTime = '0';
        }
        state[1]( prevState => {
            return { expiryTime: expiryTime }
        });
    },[]);
    const setExpiryTime = (expiryTime) => {
        state[1]( prevState => {
            return { expiryTime: expiryTime }
        });
    };
    const isValidSession = () => {
        const currentTime = new Date().getTime();
        const expiryTime = state[0].expiryTime;
        return currentTime < expiryTime;
    };
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <AuthRoute path="/" exact component={Login} type="guest" />
                        <AuthRoute
                            isValidSession={isValidSession}
                            path="/redirect"
                            type="redirect"
                            render={(props) => (
                                <RedirectPage
                                    isValidSession={isValidSession}
                                    setExpiryTime={setExpiryTime}
                                    {...props}
                                />
                            )}
                        />
                        <AuthRoute
                            path="/dashboard"
                            type="private"
                            render={(props) => (
                                <Dashboard
                                    isValidSession={isValidSession}
                                    setExpiryTime={setExpiryTime}
                                    {...props}
                                />
                            )}
                        />
                        <AuthRoute
                            path="/my-library"
                            type="private"
                            render={(props) => (
                                <MyLibrary
                                    isValidSession={isValidSession}
                                    setExpiryTime={setExpiryTime}
                                    {...props}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
  );
}

const mapStateToProps = (state) => ({
    auth: state.isAuthUser
});

const mapDispatchToProps = (dispatch) => {
    return {
        onLogOutRequest: () => dispatch({ type: LOGOUT })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
