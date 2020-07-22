import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import Column from './components/Column.jsx';
import Header from './components/Header.jsx';
/* random image */
const imageUrl = 'https://source.unsplash.com/random/?people/';
var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

function getRandomHardDate() {
    return months[Math.floor(Math.random() * 12)] + ' ' + Math.floor(Math.random() * 30 + 2)
}

function getRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}
/* imageurl needs uuid/number at the end to be random so browser don't cache the image */
const backlog = [
    {id: uuid(), content: 'Final QA', assigned:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()},
    {id: uuid(), content: 'Forms submit data properly', assigned:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()},
    {id: uuid(), content: 'Links across pages', assigned:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()}
]
const todo = [
    {id: uuid(), content: 'Do Homework', assigned:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()},
    {id: uuid(), content: "Finish Important Project for boss", assigned:imageUrl + uuid(), date: getRandomHardDate(), color: getRandomColor()}
]
/* columns from the server, currently hard coded. */
const columnsFromServer = 
    {   [uuid()] : {
            name: 'Backlog',
            items: backlog
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

/* function for when the drag ends, accounts for when dragging to other columns or to nowhere */
const dragEnd = (result, columns, setColumns) => {
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
    const copy = [...column.items];
    const [removed] = copy.splice(source.index, 1);
    copy.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copy
      }
    });
    }
};
function App() {
    const [columns, setColumns] = useState(columnsFromServer);
    /* add to column the new task */
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
    function editTask(destination, id, task) {
        
        const column = columns[destination]
        console.log(column)
        var updated = [...column.items]
        const object = {id: uuid(), content: task.title, assigned:imageUrl + uuid(), date: task.date, color: getRandomColor()}
        var index = updated.findIndex( x => x.id === id)   
        updated[index] = object
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
            <DragDropContext onDragEnd={result => dragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}} key={uuid()}>
                        <h2>{column.name}</h2>
                        <div style ={{margin: 8}}>
                        <Droppable droppableId={id} key={id}>
                            {(provided, snapshot) => {
                                return (
                                    <Column provided={provided} snapshot={snapshot} column={column} addToColumn={addToColumn} id={id} editTask={editTask}/>
                                )
                            }}
                        </Droppable>
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