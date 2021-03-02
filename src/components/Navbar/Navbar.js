import { connect } from 'react-redux';
import logo from '../../logo.svg';
import './navbar.css';
import {LOGOUT} from '../../actions/auth';
import {GOT_RESULTS, apiError} from "../../actions/api";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchResult } from "../../actions/search";

const Navbar = (props) => {
    const inputSate = useState({ searchTerm: '' });
    useEffect(()=>{
        document.getElementById('song-search').addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                if (e.target.value) {
                    searchResult(e.target.value, props.authToken, props.onResultsRequest, props.onErrorHappened);
                    window.scrollTo({
                        top: document.getElementById("results").getBoundingClientRect().top,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });
    },[]);
    return (
      <div className="Navbar flex">
        <div className="nav-user flex w1-3">
            <img className="user-img" height="45" width="45" alt="user" src={props.user && props.user.images ? props.user.images[0].url : logo}/>
            <div>{props.user ? props.user.display_name : ''}</div>
        </div>
        <input id="song-search" placeholder="Press enter to search for a song" className="search w1-3" type="text"
               value={inputSate[0].searchTerm} onChange={ event => { inputSate[1](prevState => ({ searchTerm: event.target.value })) } }/>
         <div onClick={()=> {searchResult(inputSate[0].searchTerm, props.authToken, props.onResultsRequest, props.onErrorHappened); window.scrollTo({
             top: document.getElementById("results").getBoundingClientRect().top,
             left: 0,
             behavior: 'smooth'
         });}} className="mobile-search">Search</div>
        <div className="flex w1-3 left-btns">
            <Link className="my-library zoom" to="/my-library">My Library</Link>
            <div className="logout-btn zoom" onClick={props.onLogOutRequest}>
                Logout
            </div>
        </div>
      </div>
    );
  }
const mapStateToProps = (state) => ({
    authToken: state.token
});

const mapDispatchToProps = (dispatch) => {
    return {
        onLogOutRequest: () => dispatch({ type: LOGOUT }),
        onResultsRequest: (tracks) => dispatch({ type: GOT_RESULTS, tracks: tracks }),
        onErrorHappened: (error) => dispatch(apiError(error))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);