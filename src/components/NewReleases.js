import Card from "./Card";
import { connect } from 'react-redux';
import { useState } from 'react';
import './newreleases.css';
import { useEffect } from 'react';
import rightA from '../assets/right-arrow.png';
import leftA from '../assets/left-arrow.png';

const moreCardsRight = () => {
    const last = document.getElementsByClassName('card')[document.getElementsByClassName('card').length - 1];
    if (last) {
        const lastRight = last.getBoundingClientRect().right;
        const containerLeft = document.getElementById('new-releases').getBoundingClientRect().left;
        return !(Math.floor(lastRight) === Math.floor(containerLeft));
    }
    return false;
}
const moreCardsLeft = () => {
    const first = document.getElementsByClassName('card')[0];
    if (first) {
        const firstLeft = first.getBoundingClientRect().left + 280;
        const containerRight = document.getElementById('new-releases').getBoundingClientRect().left;
        return !(Math.floor(firstLeft) >= Math.floor(containerRight));
    }
    return false;
}

const moveLeft = (state) => {
    state[1]( prevState => {
        const last = document.getElementsByClassName('card')[document.getElementsByClassName('card').length - 1];
        const lastLeft = last.getBoundingClientRect().left - 280;
        const containerLeft = document.getElementById('new-releases').getBoundingClientRect().left;
        if (lastLeft > containerLeft) return { left: prevState.left - 280, moreRight: prevState.moreRight, moreLeft: prevState.moreLeft }
        else return { left: prevState.left, moreRight: prevState.moreRight, moreLeft: prevState.moreLeft }
    });
}
const moveRight = (state) => {
    state[1]( prevState => {
        const first = document.getElementsByClassName('card')[0];
        const firstRight = first.getBoundingClientRect().right + 280;
        const containerRight = document.getElementById('new-releases').getBoundingClientRect().right;
        if (firstRight < containerRight) return { left: prevState.left + 280, moreRight: prevState.moreRight, moreLeft: prevState.moreLeft }
        else return { left: prevState.left, moreRight: prevState.moreRight, moreLeft: prevState.moreLeft }
    });
}
const NewReleases = (props) => {
    const state = useState( { left: 0, moreRight: false, moreLeft: false } );
    useEffect(()=> {
        const divHeight = document.getElementById('releases-container').scrollHeight;
        const titleHeight = document.getElementById('releases-title').scrollHeight;
        document.getElementById('new-releases').style.height = divHeight + titleHeight + 50 + 'px';
    });
    const releaseCards = props.releases.slice(0,10).map(release => <Card myLibrary={props.myLibrary} onSongRemoved={props.onSongRemoved} onSongAdded={props.onSongAdded} key={release.id} card={release} />)
    return (
        <div id="new-releases" className="new-releases">
            <h1 id="releases-title">New Releases</h1>
            <div style={{left: state[0].left + 'px'}} id="releases-container" className="releases-container">
                {releaseCards}
            </div>
            <img onClick={()=>moveRight(state)} className="arrow right" src={rightA} alt="rightA"/>
            <img onClick={()=>moveLeft(state)} className="arrow left" src={leftA} alt="leftA"/>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        releases: state.releases
    }
};
export default connect(mapStateToProps)(NewReleases);