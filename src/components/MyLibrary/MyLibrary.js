import Navbar from "./Navbar";
import '../Navbar/navbar.css'
import LibrarySongs from "./LibrarySongs";
import {Redirect} from "react-router-dom";
import Loader from "../Loader";
import React from "react";
import {connect} from "react-redux";
const MyLibrary = (props) => {
    const currentTime = new Date().getTime();
    const expTime = localStorage.getItem('validSession');
    const shouldRender = currentTime < expTime;
    return (
        <React.Fragment>
            { shouldRender ? (<div className="Dashboard">
                <Navbar/>
                <Loader isLoading={props.isLoading}/>
                <div className="dashboard-body">
                    <LibrarySongs />
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

const mapStateToProps = (state) => ({
    isLoading: state.isLoading
});

export default connect(mapStateToProps)(MyLibrary);