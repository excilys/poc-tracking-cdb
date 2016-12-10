/**
 * Created by bzil on 10/12/2016.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../reducer/gitList';

class GitList extends Component {

    constructor(props) {
        super(props);
        window.console.log("je construit ici");
        // The query is done in the constructor and not in the componentDidMount because the latter is called several times
        this.props.fetch();
    }

    render() {
        return (
            <div className="App">
                Get git info from : Excilys
            </div>
        );
    }
}


GitList.propTypes = {
    // dispatch
    fetch: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        fetch: () => dispatch(actions.fetchRepos())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GitList);