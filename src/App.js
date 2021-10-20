import React from "react";
import Header from './Header';
import List from './List';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { useState, useEffect } from 'react';
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCcQ6XCOvMIA7pHME4bWBgy_7OVy_7XErA",
    authDomain: "cs124-fall2021.firebaseapp.com",
    projectId: "cs124-fall2021",
    storageBucket: "cs124-fall2021.appspot.com",
    messagingSenderId: "264318304667",
    appId: "1:264318304667:web:4be8d27a02811b1ccd613e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// const initialData = [
//     {
//         id: "0",
//         title: "William spills the tea",
//         completed: false
//     },
//     {
//         id: "1",
//         title: "Complete 124 lab",
//         completed: true
//     },
//     {
//         id: "2",
//         title: "Grab dinner with 121",
//         completed: false
//     },
//     {
//         id: "3",
//         title: "Rename ourselves",
//         completed: false
//     },
// ];


const name = "william-la-tasks";
function App() {
    // const [data, setData] = useState(initialData);
    const [view, setView] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState(null);

    const query = db.collection(name);
    const [value, loading, error] = useCollection(query);
    
    let tasks = null;
    if (value) {
        tasks = value.docs.map((doc) => {
            return {...doc.data()}});
    }
    // An effect to ensure our updated filters work.
    // useEffect(() => {
    //     filterHandler();
    //   }, [data, view]);
    

    function handleView(value) {
        setView(value);
    }

    // Switches between the different cases a todo task could be.
    // const filterHandler = () => {
    //     switch(view) {
    //       case "completed":
    //         setFilteredTodos(data.filter((task) => task.completed === true));
    //         break;
    //       case "uncompleted":
    //         setFilteredTodos(data.filter((task) => task.completed === false));
    //         break;
    //       default:
    //         setFilteredTodos(data);
    //         break;
    //     }
    //   };

    // Deletes ALL tasks.
    function handleDeleteAll(tasks) {
        // setData(data.filter(task => !(tasks.includes(task))))
        tasks.map((task) => handleDeleteTask(task.id));
    }
    // Only deletes one task.
    function handleDeleteTask(id) {
        // setData(data.filter(task => task.id !== id))
        db.collection(name).doc(id).delete();
    }
    // Adds a new task to our data.
    function handleNewTask(value) {
        // setData([...data, {
        //     id: generateUniqueID(),
        //     title: value,
        //     completed: false
        // }])
        const newId = generateUniqueID();
        db.collection(name).doc(newId).set({
            id: newId,
            title: value,
            completed: false,
        })
    }
    // Edits a task value.
    function handleFieldChange(id, field, value) {
        // setData( data.map(
        //     task => task.id !== id
        //     ? task
        //     : {...task, ["title"]: value}))
        const doc = db.collection(name).doc(id);
        doc.update({
            [field]: value,
        })
    }

    return <div>
        <Header view={handleView}/>
        {loading && <h1>Loading</h1>}
        {tasks && <List 
                list={tasks}
                onNewTask={handleNewTask}
                onFieldChange={handleFieldChange}
                filteredTodos={null}
                onDeleteTask={handleDeleteTask}
                onDeleteAll={handleDeleteAll}
                view={view}
        />
        }
        </div>;
}
export default App;
