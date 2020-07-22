import React, {useState} from 'react';
import User from './User.jsx';
import EditScreen from './EditScreen.jsx';
/* task component for the little task note cards */
function Task(prop) {

    const [clickedEdit, setEdit] = useState(false);
    function toggleEdit() {
        
        setEdit(!clickedEdit)
    }

    

    return (
        <div>
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
        }} onClick={toggleEdit}>
        <div className='color-bar' style={{backgroundColor:prop.color}}></div>
            <h3>{prop.text}</h3>
            <User img={prop.img} date={prop.date}></User>
            
            
        </div>
        {clickedEdit?  
            <EditScreen toggleEdit={toggleEdit} editTask={prop.editTask} id={prop.id} column={prop.column} deleteTask={prop.deleteTask}/>  
             : null } 
        </div>
    )
}
export default Task;
