import './style.css';
import Header from './Header';
import List from './List';

// import People from './People';

import {  useState, useEffect } from 'react';

const initialData = [
    {
        id: "0",
        title: "William spills the tea",
        completed: false
    },
    {
        id: "1",
        title: "Get very happy",
        completed: true
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

    useEffect(() => {
        filterHandler();
      }, [data, view]);
    

    function handleView(value) {
        setView(value);
    }

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

   

    function handleNewTask(value) {
        setData([...data, {
            id: "4", //TODO: Fix ID
            title: value,
            completed: false
        }
        
        ])
    }
    function handleCompleted(id) {
        setData( data.map(
            task => task.id !== id
            ? task
            : {...task, ["completed"]: !task.completed}))
        
    }
    return <div>
        <Header view={handleView}/>
        <List list={data}
                onNewTask={handleNewTask}
                onCompleted={handleCompleted}
                filteredTodos={filteredTodos}
        
        />
        </div>;
}

export default App;
