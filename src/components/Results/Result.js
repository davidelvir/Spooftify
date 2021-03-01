const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes} : ${(seconds < 10 ? "0" : "")}${seconds}`;
}
const Result = (props) => {
    return (
      <div className="result flex">
          <img className="result-img" src={props.info.image} alt={props.info.album}/>
          <p>{props.info.name}</p>
          <p>{props.info.album}</p>
          <p>{millisToMinutesAndSeconds(Number(props.info.duration))}</p>
          <div className={props.myLibrary.some(s => s.id === props.info.id) ? "plus-minus-toggle":"plus-minus-toggle collapsed"}
               onClick={props.myLibrary.some(s => s.id === props.info.id) ? ()=>props.onSongRemoved(props.info) : ()=>props.onSongAdded(props.info)}
          ></div>
      </div>
    );
  }
  
  export default Result;