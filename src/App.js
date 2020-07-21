import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';
import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task.jsx';
import Column from './Column.jsx';
import Header from './Header.jsx';
import AddScreen from './AddScreen.jsx';
const imageUrl = 'https://source.unsplash.com/random/?people/';
var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

function getRandomHardDate() {
    return months[Math.floor(Math.random() * 13)] + ' ' + Math.floor(Math.random() * 30)
}

function getRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}
const itemsFromBackend = [
    {id: uuid(), content: 'Final QA', img:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()},
    {id: uuid(), content: 'Forms submit data properly', img:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()},
    {id: uuid(), content: 'Links across pages', img:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()}
]
const todo = [
    {id: uuid(), content: 'Final QA', img:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()},
    {id: uuid(), content: 'Forms submit data properly', img:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()},
    {id: uuid(), content: 'Links across pages', img:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()}
]

const columnsFromBackend = 
    {   [uuid()] : {
            name: 'Backlog',
            items: itemsFromBackend
        },
        [uuid()]: {
            name: 'To do',
            items: todo
        },
        [uuid()]: {
            name: 'In Progress',
            items: []
        },
        [uuid()]: {
            name: 'Done',
            items:[]
        }

    };





const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const {source, destination } = result;
    if(source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]:  {
                ...sourceColumn, 
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn, 
                items: destItems
            }
        })
    }
    else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
}





};
function App() {


    const [columns, setColumns] = useState(columnsFromBackend);
    const [clicked, setClicked] = useState(false);

    function toggleAdd() {
        setClicked(true)
        
    }
    
    return (
        <div>
        <Header></Header>
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%'}}>
           
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h2>{column.name}</h2>
                        <div style ={{margin: 8}}>
                        <Droppable droppableId={id} key={id}>
                            {(provided, snapshot) => {
                                return (
                                    <Column provided={provided} snapshot={snapshot} column={column} toggleAdd={toggleAdd}/>
                                )
                            }}
                        </Droppable>
                    </div>
                    </div>
                    )
                })}
            </DragDropContext>
        </div>
        {clicked ?  
            <AddScreen />  
            : null }      
        </div>
    )
}
export default App