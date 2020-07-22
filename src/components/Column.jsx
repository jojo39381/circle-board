import React, {useState} from 'react';
import {Draggable } from 'react-beautiful-dnd';
import Task from './Task.jsx';
import Add from './Add.jsx';
import AddScreen from './AddScreen.jsx';
function Column(prop) {

    const [clicked, setClicked] = useState(false);
    

    function toggleAdd() {
        setClicked(!clicked)
        
    }
    function addTask(destination, text) {
        console.log(destination)
        prop.addToColumn(destination, text)
        
       
        
        
    }
    return (
        <div>
        <Add toggleAdd={toggleAdd}></Add>
        <div {...prop.provided.droppableProps}
        ref={prop.provided.innerRef}
        style={{background: prop.snapshot.isDraggingOver ? '#F3F4F6' : '#F3F4F6', padding: 4, width: 250, minHeight: 500}}
        >
            {prop.column.items.map((item, index) => {
                                            return (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <Task provided={provided} snapshot= {snapshot} text = {item.content} img={item.assigned} date={item.date} color={item.color} />

                                                            
                                                        );
                                                    }}
                                                </Draggable>
                                            );
                                        })}
                                    {prop.provided.placeholder}
        </div>
                        {clicked ?  
                        <AddScreen toggleAdd={toggleAdd} addTask={addTask} id={prop.id} />  
                     : null } 
        </div>
    )
}
export default Column;