import { useState } from 'react'
import './App.css'

export default function App() {

  const [todos, setTodos] = useState([
    {
      title: "go to gym",
      description: "hit the gym hard",
      done: true
    },
  ]);

  function addTodo() {

    let newArray = [];
    for (let i = 0; i < todos.length; i++) {
      newArray.push(todos[i]);
    }

    newArray.push({
      title: "eat food",
      description: "eat food properly",
      done: true
    });

    setTodos(newArray);
  }

  return (
    <div>
      <input type="text" placeholder="Title" />
      <input type="text" placeholder="Description" />

      <br />

      <button onClick={addTodo}>Add Todo</button>
<br />
    
    <Todo title = {todos[0].title} description={todos[0].description} done = {todos[0].done}/>
    </div>
  );
}


function Todo(props){
  return(
    <div>
      <h1>{props.title}</h1>
      <h1>{props.description}</h1>
      <h1>{props.done? "task is done" : "task is not done"}</h1>
    </div>
  )
}