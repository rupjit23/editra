import React from 'react'
import Avatar from 'react-avatar';

function Client(props) {
    return (
        <div className="flex items-center space-x-3">
            <Avatar 
              name={props.username} 
              size={50} 
              round="14px" 
            />
            <span className="text-white font-medium">
                {props.username}
            </span>
        </div>
    )
}

export default Client;
