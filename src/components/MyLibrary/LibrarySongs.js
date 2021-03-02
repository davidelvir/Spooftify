import LibraryCard from "./LibraryCard";
import { connect } from 'react-redux';
import { useState } from 'react';
import '../newreleases.css';
import { useEffect } from 'react';
import rightA from '../../assets/right-arrow.png';
import leftA from '../../assets/left-arrow.png';
import {ADD_TO_LIBRARY, REMOVE_FROM_LIBRARY} from "../../actions/actions";

const moveLeft = (state) => {
    state[1]( prevState => {
        const last = document.getElementsByClassName('card')[document.getElementsByClassName('card').length - 1];
        const lastLeft = last.getBoundingClientRect().left - 240;
        const containerLeft = document.getElementById('library-songs').getBoundingClientRect().left;
        if (lastLeft > containerLeft) return { left: prevState.left - 266, moreRight: prevState.moreRight, moreLeft: prevState.moreLeft }
        else return { left: prevState.left, moreRight: prevState.moreRight, moreLeft: prevState.moreLeft }
    });
}
const moveRight = (state) => {
    state[1]( prevState => {
        const first = document.getElementsByClassName('card')[0];
        const firstRight = first.getBoundingClientRect().right + 240;
        const containerRight = document.getElementById('library-songs').getBoundingClientRect().right;
        if (firstRight < containerRight) return { left: prevState.left + 266, moreRight: prevState.moreRight, moreLeft: prevState.moreLeft }
        else return { left: prevState.left, moreRight: prevState.moreRight, moreLeft: prevState.moreLeft }
    });
}
const LibrarySongs = (props) => {
    const state = useState( { left: 0, moreRight: false, moreLeft: false } );
    const libraryCards = props.myLibrary.slice(0,10).map(release => <LibraryCard user={props.user} myLibrary={props.myLibrary} onSongRemoved={props.onSongRemoved} onSongAdded={props.onSongAdded} key={release.id} card={release} />)

    useEffect(()=> {
        if (libraryCards.length > 0) {
            const divHeight = document.getElementById('library-container').scrollHeight;
            const titleHeight = document.getElementById('library-title').scrollHeight;
            document.getElementById('library-songs').style.height = divHeight + titleHeight + 50 + 'px';
        }
    });
    return (
        libraryCards.length > 0 ? (<div id="library-songs" className="new-releases">
            <h1 id="library-title">Songs in library</h1>
            <div style={{left: state[0].left + 'px'}} id="library-container" className="releases-container">
                {libraryCards}
            </div>
            <img onClick={()=>moveLeft(state)} className="arrow right" src={rightA} alt="rightA"/>
            <img onClick={()=>moveRight(state)} className="arrow left" src={leftA} alt="leftA"/>
        </div>):(<div className="nothing-to-show">
            <h1>:(</h1>
            <h1>Your library is empty!</h1>
            <h1>Go to search to find new songs!</h1>
        </div>)
    );
}
const mapStateToProps = (state) => {
    return {
        myLibrary: state.myLibrary,
        user: state.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSongAdded: (song) => dispatch({ type: ADD_TO_LIBRARY, song }),
        onSongRemoved: (song) => dispatch({ type: REMOVE_FROM_LIBRARY, song })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(LibrarySongs);