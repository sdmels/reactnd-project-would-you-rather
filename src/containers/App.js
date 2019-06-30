import { connect } from 'react-redux';
import App from './../components/App';
import { fetchUsers } from './../actions/users';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  handleGetUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
