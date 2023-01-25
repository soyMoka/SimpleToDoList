import { nanoid } from 'nanoid';
import React, {useEffect, useRef, useState } from 'react';
import Form from './components/Form/Form';
import Todo from './components/Todo/Todo'
import FilterButton from './components/FilterButton/FilterButton';


const usePrevious = (value)=> {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All:() => true,
  Active:(task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = (props) => {
  const listHeadingRef = useRef(null);
  
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState(props.tasks);
  
  const addTask = (name)=>{
    let newTask = { id: `todo-${nanoid()}`, name, completed: false}
    setTasks([...tasks, newTask])
    
  }
  
  const toggleTaskCompleted = (id) =>{
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  
  const deleteTask = (id) =>{
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  
  const editTask = (id, newName) => {
    const editedTaskList = tasks.map((task)=>{
      if (id === task.id){
        return {...task, name: newName}
      }
      return task;
    })
    setTasks(editedTaskList);
  }
  
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo 
        id={task.id}
        name={task.name} 
        completed={task.completed} 
        key={task.id + task.name}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask = {editTask}
      />
    )
  );
  
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
        
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  
  const prevTaskLength = usePrevious(tasks.length);
  
  console.log('0 tareas actuales ', tasks.length);
  console.log('0 tareas previas ', prevTaskLength);
  console.log('0 actuales - previas ',tasks.length - prevTaskLength);

  useEffect(() => {
    console.log('1 tareas actuales ', tasks.length);
    console.log('1 tareas previas ', prevTaskLength);
    console.log('1 actuales - previas ',tasks.length - prevTaskLength);
    console.log('==================================');
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
      console.log('esto lo logrò hacer');
    }
    else {console.log('algo salio mal aca');}
  }, [tasks.length, prevTaskLength]);
  

  return (
    <div className="todoapp stack-large">
      <h1>Simple To do</h1>
      
      <Form addTask={addTask}/>

      <div className="filters btn-group stack-exception">
        
        {filterList}

      </div>

      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>


      <ul
        //role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        
        {taskList}
        
        </ul>
    </div>
  );
}


export default App;
