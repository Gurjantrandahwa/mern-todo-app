import React, {useEffect, useState} from "react";
import "./App.css"

const API_BASE = "http://localhost:3001";

function App() {
    const [todos, setTodos] = useState([])
    const [popup, setPopup] = useState(false)
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        GetTodos();
    }, [])
    const GetTodos = () => {
        fetch(API_BASE + "/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(error => console.error("ERROR", error))
    }
    const completeTodo = async (id) => {
        const data = await fetch(API_BASE + "/todo/complete/" + id,{method:"PUT"})
            .then(res => res.json())
        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
                todo.complete = data.complete
            }
            return todo
        }))
    }
    const deleteTodo = async (id) => {
        const data = await fetch(API_BASE + "/todo/delete/" + id, {
            method: "DELETE"
        }).then(res => res.json())
        setTodos(todos => todos.filter(todo => todo._id !== data._id))
    }
    const addTodo = async () => {
        const data = await fetch(API_BASE + "/todo/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo
            })
        }).then(res => res.json())
        setTodos([...todos, data])
        setPopup(false)
        setNewTodo('')
    }
    return <div className="app">
        <h1>To do</h1>
        <h4>Your Tasks</h4>
        <div className={"todos"}>
            {todos.map(todo => {
                return  <div className={"todo " + (todo.complete ? "is-complete": "")} key={todo._id}>
                    <div className={"checkbox"}  onClick={()=>{
                        completeTodo(todo._id)
                    }}/>
                    <div className={"text"}  onClick={()=>{
                        completeTodo(todo._id)
                    }}>{todo.text}</div>
                    <div className={"delete-todo"} onClick={()=>{
                        deleteTodo(todo._id)
                    }}>x</div>
                </div>
            })}
        </div>
        <button className={"add-popup"} onClick={() => setPopup(true)}>
            +
        </button>
        {
            popup ? (
                <div className={"popup"}>
                    <div className={"close-popup"} onClick={() => setPopup(false)}>
                        x
                    </div>
                    <div className={"content"}>
                        <h3>Add Task</h3>
                        <input type={"text"}
                               onChange={e => setNewTodo(e.target.value)}
                               value={newTodo}/>
                        <button onClick={addTodo}>Create Task</button>
                    </div>
                </div>
            ) : ''}
    </div>
}
export default App;
