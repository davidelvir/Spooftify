import { connect } from 'react-redux';
import './login.css'
const {
    REACT_APP_SPOTIFY_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL
} = process.env;

const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
}

const Login = (props) => {
    return (
      <div className="Login">
          <h1>Spooftify</h1>
          <div className="login-btn" onClick={handleLogin}>Login with spotify</div>
      </div>
    );
  }
  
  export default connect()(Login);