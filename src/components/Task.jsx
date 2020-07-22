import React from 'react';
import User from './User.jsx';
function Task(prop) {
    return (
        <div className='note' ref={prop.provided.innerRef}
        {...prop.provided.draggableProps}
        {...prop.provided.dragHandleProps}
        style={{
            usereSelect: 'none',
            padding: 16,
            margin: '0 0 8px 0',
            minHeight: '50px',
            backgroundColor: prop.snapshot.isDragging ? '#D5D5D5' : '#FFFFFF',
            color: 'black',
            ...prop.provided.draggableProps.style
        }}>
        <div className='color-bar' style={{backgroundColor:prop.color}}></div>
            <h3>{prop.text}</h3>
            <User img={prop.img} date={prop.date}></User>
            
            

        </div>
    )
}
export default Task;
