import { connect } from 'react-redux';
import Nav from '../components/Nav/Nav';
import commons from './../utils/commons';
import { logout } from './../actions/auth';
import { getFromLocalStorage } from '../utils/localStorage';

function mapStateToProps() {
  return {
    getAuthenticatedUserData: () => getFromLocalStorage(commons.user),
  };
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
