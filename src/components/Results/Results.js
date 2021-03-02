import Result from "./Result";
import './results.css'
const Results = (props) => {
    const toRender = props.results.map(r => <Result user={props.user} onSongAdded={props.onSongAdded} onSongRemoved={props.onSongRemoved} myLibrary={props.myLibrary} info={r} key={r.id}/>)
    return (
      <div className="results">
          {toRender}
      </div>
    );
  }
  
  export default Results;