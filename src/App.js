import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';
import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task.jsx';
import Column from './Column.jsx';
import Header from './Header.jsx';

const imageUrl = 'https://source.unsplash.com/random/?people/';
var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

function getRandomHardDate() {
    return months[Math.floor(Math.random() * 12)] + ' ' + Math.floor(Math.random() * 30 + 2)
}

function getRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}
const itemsFromBackend = [
    {id: uuid(), content: 'Final QA', assigned:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()},
    {id: uuid(), content: 'Forms submit data properly', assigned:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()},
    {id: uuid(), content: 'Links across pages', assigned:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()}
]
const todo = [
    {id: uuid(), content: 'Do Homework', assigned:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()},
    {id: uuid(), content: "Finish Project", assigned:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()}
]

const columnsFromBackend = 
    {   [uuid()] : {
            name: 'Backlog',
            items: itemsFromBackend
        },
        [uuid()]: {
            name: 'Ready To Do',
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
    // const [clicked, setClicked] = useState(false);
    

    // function toggleAdd() {
    //     console.log('lmao')
    //     setClicked(!clicked)
        
    // }

    function addToColumn(destination, task) {
        const column = columns[destination]
        var updated = [...column.items]
        const object = {id: uuid(), content: task.title, assigned:imageUrl + uuid(), date: task.date, color: getRandomColor()}
        updated.push(object)

        setColumns({
            ...columns,
            [destination]: {
              ...column,
              items: updated
            }
          });

    }

   
    
    return (
        <div>
        <Header></Header>
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%'}}>
           
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}} key={uuid()}>
                        <h2>{column.name}</h2>
                        <div style ={{margin: 8}}>
                        <Droppable droppableId={id} key={id}>
                            {(provided, snapshot) => {
                                return (
                                    <Column provided={provided} snapshot={snapshot} column={column} addToColumn={addToColumn} id={id}/>
                                    
                                )
                            }}
                        </Droppable>
                        {/* {clicked ?  
                        <AddScreen toggleAdd={toggleAdd} addTask={addTask} column={id}/>  
                     : null } */}
                    </div>
                    </div>
                    )
                })}
            </DragDropContext>
        </div>
              
        </div>
    )
}
export default App