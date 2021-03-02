import '../card.css';
const LibraryCard = (props) => {
    return (
        <div className="card">
            <img src={props.card.image} alt="Person" className="card__image"/>
            <p className="card__name">{props.card.name}</p>
            <button onClick={props.myLibrary.some(s => s.id === props.card.id) ? ()=>props.onSongRemoved({ song: props.card, user: props.user, library: props.myLibrary }) : ()=>props.onSongAdded({ song: props.card, user: props.user, library: props.myLibrary })} className="btn draw-border">
                {props.myLibrary.some(s => s.id === props.card.id) ? 'Remove from library':'Add to library'}
            </button>
        </div>
    );
}

export default LibraryCard;