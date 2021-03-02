import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
    const { isAuthUser, type, location } = props;
    const { state } = location;
    const sessionExpired = state && state.session_expired;
    if (type === "guest" && isAuthUser && !sessionExpired) return <Redirect to="/dashboard" />;
    else if (type === "private" && !isAuthUser) return <Redirect to="/" />;

    return <Route {...props} />;
};

const mapStateToProps = ({ isAuthUser }) => ({
    isAuthUser
});

export default connect(mapStateToProps)(AuthRoute);