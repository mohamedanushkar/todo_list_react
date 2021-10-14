import React from 'react'
import { useState , useEffect, useRef } from 'react';


const statusColours = {
    Urgent: "red",
    Complete: "lightgreen",
    Standard: "aqua"
};


const TodoSingle = ({removeTodo, index , update , todo= {}}) => {
    
    const [editMode, setEditMode] = useState(true);
    
    const inputRef = useRef(null);
    const selectRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    });
  
    const [task, setTask] = useState({
            tasktext:'',
            tasktype: 'Standard'
    });
        
    const setFields = (e) => {
        const newTaskData = { ...task };
        newTaskData[e.target.name] = e.target.value;
        setTask(newTaskData);
        update(newTaskData , index)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditMode(false);    
    }

    const handleClick = (e) => {
        setEditMode(!editMode);
        if (inputRef.current) inputRef.current.focus();
    }
    
    function blurHandler(e) {
        setTimeout(() => {
          const activeEl = document.activeElement;
          if (activeEl === inputRef.current || activeEl === selectRef.current)
            return;
          setEditMode(false);
        }, 50);
    }
    
    return (
        <div onBlur={(e) => blurHandler(e)}>
            <div className='todo-row'  style={{ backgroundColor: statusColours[todo.tasktype] , color: todo.tasktype === "Urgent" ? "white" : "black" }}>
                {editMode ? (
                    <form className="todo-form todo-inside" onSubmit={(e) => handleSubmit(e)}>

                        <input
                        type="text" 
                        ref={inputRef} 
                        autoComplete="off" 
                        name="tasktext"  
                        value={task.tasktext} 
                        className="todo-input" 
                        onChange={(e) => setFields(e)} 
                        />

                        <select 
                        name="tasktype" 
                        style={{ backgroundColor: statusColours[todo.tasktype] , color: todo.tasktype === "Urgent" ? "white" : "black" }} 
                        ref={selectRef} value={task.tasktype} onChange={(e) => setFields(e)}
                        >
                            <option value="Standard">Standard</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Complete">Complete</option>
                        </select>
                        
                        
                    </form>
                ):(                    
                    <div className="todo-inside" key={index} onClick={() =>handleClick()}>
                        <p>{todo.tasktext}</p>
                    </div>
                )}
                <div  onClick={() => removeTodo(index)} className="delete-icon">X</div>
            </div>
        </div>
    )
}

export default TodoSingle
