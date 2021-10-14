import React , {useState}from 'react';
import TodoSingle from './TodoSingle';

const TodoList = () => {

    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        const newTodo = [...todos , 
            { 
                id: Math.floor(Math.random() * 999999999),
                text: "cvbbn",
                isBlank: true 
            } 
        ]
        setTodos(newTodo)
    }

    const removeTodo = id =>{
        setTodos((todos) => {
            const newColors = [...todos];      
            newColors.splice(id, 1);
            return newColors;
        });
    }

    function dataUpdateHandler(field, index) {
        setTodos((oldData) => {
          const newData = [...oldData];
          newData[index] = field;
          return newData;
        });
    }

    return (
        <div>
            {todos.map ((todo , index) => (
                <TodoSingle  key={index} update={dataUpdateHandler} removeTodo={removeTodo} todo={todo} index={index} />
            ))}

            <div className="add-button" onClick={addTodo}>
                +
            </div>   
        </div>
    )
}

export default TodoList
