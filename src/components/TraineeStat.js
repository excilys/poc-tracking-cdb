import React from 'react'
import ProfileBox from './ProfileBox'

class TraineeStat extends React.Component {

    render() {
        return (
            <div>
                {this.props.trainee.infos !== undefined &&
                <ProfileBox
                    imageUrl={this.props.trainee.infos.owner.avatar_url}
                    pseudo={this.props.trainee.infos.owner.login}
                />
                }
            </div>
        );
    };
}

TraineeStat.propTypes = {
    trainee: React.PropTypes.object.isRequired,
};

export default TraineeStat;
