import { connect } from 'react-redux';
import Login from './../components/Login';
import { login } from './../actions/auth';

const mapStateToProps = ({ users }) => ({
  users: Object.values(users),
});

const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
