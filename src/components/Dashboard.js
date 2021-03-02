import Navbar from "./Navbar/Navbar";
import Results from "./Results/Results";
import NewReleases from "./NewReleases";
import ErrorMessage from "./ErrorMessage";
import { GET_NEW_RELEASES, GET_USER } from "../actions/api";
import { ADD_TO_LIBRARY, REMOVE_FROM_LIBRARY } from "../actions/actions";
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './dashboard.css';
import { Redirect } from 'react-router-dom';
import Loader from "./Loader";
const Dashboard = (props) => {
    useEffect(()=> {
        props.onAuthTokenReceived(props.authToken);
        props.getUser(props.authToken);
    }, []);
    const currentTime = new Date().getTime();
    const expTime = localStorage.getItem('validSession');
    const shouldRender = currentTime < expTime;
    return (
        <React.Fragment>
            { shouldRender ? (<div className="Dashboard">
                <Loader isLoading={props.isLoading} />
                <Navbar user={props.user}/>
                <ErrorMessage show={props.showError}/>
                <div className="dashboard-body">
                    <NewReleases user={props.user} onSongAdded={props.onSongAdded} onSongRemoved={props.onSongRemoved} myLibrary={props.myLibrary}/>
                    <Results user={props.user} results={props.searchResults} onSongAdded={props.onSongAdded} onSongRemoved={props.onSongRemoved} myLibrary={props.myLibrary}/>
                </div>
            </div>) : (
                <Redirect
                to={{
                    pathname: '/',
                    state: {
                        session_expired: true
                    }
                    }}
                />) }
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        authToken: state.token,
        user: state.user,
        myLibrary: state.myLibrary,
        searchResults: state.searchResults,
        isLoading: state.isLoading,
        showError: state.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthTokenReceived: (token) => dispatch({ type: GET_NEW_RELEASES, authToken: token }),
        getUser: (token) => dispatch({ type: GET_USER, authToken: token }),
        onSongAdded: (song) => dispatch({ type: ADD_TO_LIBRARY, song }),
        onSongRemoved: (song) => dispatch({ type: REMOVE_FROM_LIBRARY, song })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);