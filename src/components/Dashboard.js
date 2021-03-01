import Navbar from "./Navbar/Navbar";
import Results from "./Results/Results";
import NewReleases from "./NewReleases";
import { GET_NEW_RELEASES, GET_USER } from "../actions/api";
import { ADD_TO_LIBRARY, REMOVE_FROM_LIBRARY } from "../actions/actions";
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './dashboard.css';
import { Redirect } from 'react-router-dom';
import Loader from "./Loader";
import {searchResult} from "../actions/search";
const Dashboard = (props) => {
    useEffect(()=> {
        props.onAuthTokenReceived(props.authToken);
        props.getUser(props.authToken);
    }, []);
    const t = props.myLibrary.map(s => <h1 key={s.id}>{s.name}</h1>);
    const currentTime = new Date().getTime();
    const expTime = localStorage.getItem('validSession');
    const shouldRender = currentTime < expTime;
    return (
        <React.Fragment>
            { shouldRender ? (<div className="Dashboard">
                <Navbar user={props.user}/>
                <div className="dashboard-body">
                    <NewReleases onSongAdded={props.onSongAdded} onSongRemoved={props.onSongRemoved} myLibrary={props.myLibrary}/>
                    <Results results={props.searchResults} onSongAdded={props.onSongAdded} onSongRemoved={props.onSongRemoved} myLibrary={props.myLibrary}/>
                    {t}
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
        searchResults: state.searchResults
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