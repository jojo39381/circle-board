import React, {useState} from 'react';
function EditScreen(prop) {

    function editTask() {
        prop.editTask(prop.column, prop.id, task)
    }
    function deleteTask() {
        prop.deleteTask(prop.column, prop.id)
    }

    const [task, setTask] = useState({
        title: "",
        date: ""
      });
    
      function handleChange(event) {
          
        const { name, value } = event.target;
        
        setTask(prevNote => {
          return {
            ...prevNote,
            [name]: value
          };
        });
      }
      
    return(
    <div className='overlay'>
    <div className='popup'>
    <button className="close" onClick={prop.toggleEdit}>&times;</button>
        <h1>
            Update Task
        </h1>

        <input type="text" placeholder='Task' onChange={handleChange} value={task.title} name='title'>

        </input>
        <input type="text" placeholder='Due Date...format ex: Dec 02' onChange={handleChange} value={task.date} name='date'>

        </input>
        <button style={{width: '30%', border:'none', backgroundColor:'#eb3b5a', height: '30px', borderRadius:'2px', marginRight: '70px'}} onClick={deleteTask}>Delete</button>
        <button style={{width: '30%', border:'none', backgroundColor:'#FFC312', height: '30px', borderRadius:'2px'}} onClick={editTask}>Update</button>
    </div>
    </div>
    )
}

export default EditScreen