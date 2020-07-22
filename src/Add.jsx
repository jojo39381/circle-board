import React from 'react';
function Add(prop) {
    return (
        <div className='note' 
        style={{padding: 16,
            margin: '0 0 8px 0',
            minHeight: '50px',
            padding: 4, display:'flex', alignItems:'center', justifyContent:'center'}}>

            <button style={{fontSize:'25px', border:'none', backgroundColor: 'white', width: '100%'}} onClick={prop.toggleAdd} >+</button>
        </div>
    )
}

export default Add