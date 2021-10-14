import React from "react";
// import './style.css';
import Header from './Header';
import List from './List';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { useState, useEffect } from 'react';

const initialData = [
    {
        id: "0",
        title: "William spills the tea",
        completed: false
    },
    {
        id: "1",
        title: "be sad and lonely and",
        completed: false
    },
    {
        id: "2",
        title: "Grab dinner with 121",
        completed: false
    },
    {
        id: "3",
        title: "Rename ourselves",
        completed: false
    },
];




function App() {
    const [data, setData] = useState(initialData);
    const [view, setView] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState(null);

    // An effect to ensure our updated filters work.
    useEffect(() => {
        filterHandler();
      }, [data, view]);
    

    function handleView(value) {
        setView(value);
    }

    // Switches between the different cases a todo task could be.
    const filterHandler = () => {
        switch(view) {
          case "completed":
            setFilteredTodos(data.filter((task) => task.completed === true));
            break;
          case "uncompleted":
            setFilteredTodos(data.filter((task) => task.completed === false));
            break;
          default:
            setFilteredTodos(data);
            break;
        }
      };

    // Deletes ALL tasks.
    function handleDeleteAll(tasks) {
        setData(data.filter(task => !(tasks.includes(task))))
    }
    // Only deletes one task.
    function handleDeleteTask(id) {
        setData(data.filter(task => task.id !== id))
    }
    // Adds a new task to our data.
    function handleNewTask(value) {
        setData([...data, {
            id: generateUniqueID(),
            title: value,
            completed: false
        }
        
        ])
    }
    // Changes the value of completed when a user checks off something.
    function handleCompleted(id) {
        setData( data.map(
            task => task.id !== id
            ? task
            : {...task, ["completed"]: !task.completed}))
        
    }
    // Edits a task value.
    function handleEdit(id, value) {
        setData( data.map(
            task => task.id !== id
            ? task
            : {...task, ["title"]: value}))
        
    }
    return <div>
        <Header view={handleView}/>
        <List list={data}
                onNewTask={handleNewTask}
                onCompleted={handleCompleted}
                filteredTodos={filteredTodos}
                onDeleteTask={handleDeleteTask}
                onDeleteAll={handleDeleteAll}
                onEditTask={handleEdit}
                view={view}
        />
        </div>;
}
export default App;
