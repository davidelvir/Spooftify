import './card.css';
const Card = (props) => {
  return (
    <div className="card">
        <img src={props.card.image} alt="Person" className="card__image"/>
        <p className="card__name">{props.card.name}</p>
        <button onClick={props.myLibrary.some(s => s.id === props.card.id) ? ()=>props.onSongRemoved(props.card) : ()=>props.onSongAdded(props.card)} className="btn draw-border">
            {props.myLibrary.some(s => s.id === props.card.id) ? 'Remove from library':'Add to library'}
        </button>
    </div>
  );
}

export default Card;
