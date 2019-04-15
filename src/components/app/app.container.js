import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from './app';

function mapStateToProps(state){
    return {};
}

function mapDispatchToProps(dispatch){
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));