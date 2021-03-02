import './loader.css';
const Loader = (props) => {
    return (props.isLoading ? (<div className="loader">
        <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>):null);
};
export default Loader;