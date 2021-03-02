import './errormessage.css';
const ErrorMessage = (props) => {
    return (
        props.show ? (<div className="error-container">
            <h1 className="error-data">Ocurrió un error</h1>
        </div>) : null
    );
}
export default ErrorMessage;