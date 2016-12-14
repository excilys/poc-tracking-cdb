/**
 * Created by charles on 14/12/16.
 */

import React from 'react'

class ProfileBox extends React.Component {

    render() {
        return (
            <div className='profilBox'>
                <img style={imageStyle} className='profilPicture' src={this.props.imageUrl} />
                <span className='profilPseudo'>{this.props.pseudo}</span>
                <p className='profilName'>{this.props.name}</p>
            </div>
        );
    };
}

ProfileBox.propTypes = {
    imageUrl: React.PropTypes.string.isRequired,
    pseudo: React.PropTypes.string.isRequired,
    name: React.PropTypes.string
};

export default ProfileBox;

const imageStyle = {
    borderRadius: '8px',
    display: 'inline',
    height: '80px',
    width: '80px'
};
