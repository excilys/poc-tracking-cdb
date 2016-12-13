/**
 * Created by charles on 11/12/16.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../reducer/traineesGithub';

class TraineeDetails extends Component {

    constructor(props) {
        super(props);
      let keys = Object.keys(this.props.traineesGithub);
        this.props.fetchInfos(keys[0], this.props.traineesGithub[keys[0]].repo);
        this.props.fetchCommits(keys[0], this.props.traineesGithub[keys[0]].repo);
    }

    render() {
        return (
            <div className="App">
                Get git Details
            </div>
        );
    }
}


TraineeDetails.propTypes = {
    // dispatch
    fetchInfos: React.PropTypes.func.isRequired,
    fetchCommits: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        traineesGithub: state.traineesGithub
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchInfos: (pseudo, repo) => dispatch(actions.fetchFirstInfos(pseudo, repo)),
        fetchCommits: (pseudo, repo) => dispatch(actions.fetchCommitList(pseudo, repo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TraineeDetails);