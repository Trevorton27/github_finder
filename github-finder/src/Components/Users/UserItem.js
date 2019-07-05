import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({user: {login, avatar_url, username, html_url}}) => {
   
        return (
            <div className="card text-center">
                <img 
                src={avatar_url} 
                alt="" 
                className='round-img'
                style={{width: '80px'}}
                />
                <h2>{login}</h2>
                <div>
                    <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
                        MORE
                    </Link>
                </div>
            </div>
        )
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserItem
