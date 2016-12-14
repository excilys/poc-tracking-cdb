/**
 * Created by charles on 11/12/16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../reducer/traineesGithub';
import TraineeStat from '../components/TraineeStat'

class TraineeDetails extends Component {

    constructor(props) {
        super(props);
        Object.keys(this.props.traineesGithub).forEach((key) => {
            this.props.fetchInfos(key, this.props.traineesGithub[key].repo);
            this.props.fetchCommits(key, this.props.traineesGithub[key].repo);
        })
    }

    render() {
        return (
            <div className="App">
                {Object.keys(this.props.traineesGithub).map(
                    (pseudo) => {
                        return (<TraineeStat key={pseudo} trainee={this.props.traineesGithub[pseudo]}/>)
                    }
                )}
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
        fetchCommits: (pseudo, repo) => dispatch(actions.fetch30FirstCommit(pseudo, repo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TraineeDetails);
