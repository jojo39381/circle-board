import React from 'react';


function User(prop) {
    return (
        <div >
        <img className='user' src={prop.img} alt=""></img>
        <span className='date'>{prop.date}</span>
        
        </div>
    )
}
export default User