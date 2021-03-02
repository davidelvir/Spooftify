import { connect } from 'react-redux';
import logo from '../../logo.svg';
import {LOGOUT} from '../../actions/auth';
import {GET_USER, GOT_RESULTS} from "../../actions/api";
import { Link } from 'react-router-dom';
import {useEffect} from "react";

const Navbar = (props) => {
    useEffect(()=> {
        props.getUser(props.authToken);
    }, []);
    return (
        <div className="Navbar flex">
            <div className="nav-user flex w1-3">
                <img className="user-img" height="45" width="45" alt="user" src={props.user && props.user.images ? props.user.images[0].url : logo}/>
                <div>{props.user ? props.user.display_name : ''}</div>
            </div>
            <div className="w1-3">MY LIBRARY</div>
            <div className="flex w1-3 left-btns">
                <Link className="my-library zoom" to="/dashboard">Search</Link>
                <div className="logout-btn zoom" onClick={props.onLogOutRequest}>
                    Logout
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    authToken: state.token,
    user: state.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        onLogOutRequest: () => dispatch({ type: LOGOUT }),
        onResultsRequest: (tracks) => dispatch({ type: GOT_RESULTS, tracks: tracks }),
        getUser: (token) => dispatch({ type: GET_USER, authToken: token })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);