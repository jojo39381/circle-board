import React from 'react';
import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task.jsx';
import Add from './Add.jsx';
function Column(prop) {
    return (
        <div>
        <Add toggleAdd={prop.toggleAdd}></Add>
        <div {...prop.provided.droppableProps}
        ref={prop.provided.innerRef}
        style={{background: prop.snapshot.isDraggingOver ? '#F3F4F6' : '#F3F4F6', padding: 4, width: 250, minHeight: 500}}
        >
            {prop.column.items.map((item, index) => {
                                            return (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <Task provided={provided} snapshot= {snapshot} text = {item.content} img={item.img} date={item.date} color={item.color} />

                                                            
                                                        );
                                                    }}
                                                </Draggable>
                                            );
                                        })}
                                    {prop.provided.placeholder}
        </div>
        </div>
    )
}
export default Column;