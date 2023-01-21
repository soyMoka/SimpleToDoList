import React from "react";
const Todo = (props) => {
    return (
        <li className="todo stack-small">
          <div className="c-cb">
            <input 
              id={props.id} 
              type="checkbox" 
              defaultChecked={props.completed} 
              onChange = {()=> props.toggleTaskCompleted(props.id)}
            />
            <label className="todo-label" htmlFor="todo-0">
              {props.name}
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">Eat</span>
            </button>
            <button type="button" className="btn btn__danger" onClick={()=>props.deleteTask(props.id)}>
              Delete <span className="visually-hidden">Eat</span>
            </button>
          </div>
        </li>
    );
}

export default Todo;

