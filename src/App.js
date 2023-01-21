import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import Form from './components/Form/Form';
import Todo from './components/Todo/Todo'
import FilterButton from './components/FilterButton/FilterButton';

function App(props) {

  
  const [tasks, setTasks] = useState(props.tasks)

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
  
  const taskList = tasks?.map((task) => (
      <Todo 
        id={task.id}
        name={task.name} 
        completed={task.completed} 
        key={task.id + task.name}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
      />
    )
  );

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
    
      
  
  return (
    <div className="todoapp stack-large">
      <h1>Simple To do</h1>
      
      <Form addTask={addTask}/>

      <div className="filters btn-group stack-exception">
        <FilterButton 
          name='All'
        />
        <FilterButton 
          name='Active'
        />
        <FilterButton 
          name='Completed'
        />
      </div>

      <h2 id="list-heading">{headingText}</h2>

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
