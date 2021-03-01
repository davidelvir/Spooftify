import { connect } from 'react-redux';
import { LOGIN } from '../actions/auth';
import { useEffect } from 'react';

const getParamValues = (url) => {
    return url
        .slice(1)
        .split('&')
        .reduce((prev, curr) => {
            const [title, value] = curr.split('=');
            prev[title] = value;
            return prev;
        }, {});
};

const RedirectPage = (props) => {
    console.log('hola');
    const { setExpiryTime, history, location } = props;
    useEffect(()=> {
        const access_token = getParamValues(location.hash);
        const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
        access_token.expires_in = expiryTime;
        props.onAuthTokenReceived(access_token);
        console.log(access_token);
        props.setExpiryTime(expiryTime);
        history.push('/dashboard');
    });
    return (
        <div className="redirect">
            Redirect Page
        </div>
    );
}
const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthTokenReceived: (token) => dispatch({ type: LOGIN, token: token })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RedirectPage);