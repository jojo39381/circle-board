import React from 'react';
import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function User(prop) {
    return (
        <div >
        <img className='user' src={prop.img}></img>
        <span className='date'>{prop.date}</span>
        
        </div>
    )
}
export default User