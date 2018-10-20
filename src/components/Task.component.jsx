import React from 'react';
import TaskType from './Task.type.js';
import {markAsCompleted, removeTask} from '../store/actions'
import './Task.component.css';

class Task extends React.Component {
    static propTypes = {
        data: TaskType
    }
    render () {
        return (
            <div className={`taskItem ${this.props.data.completed ? 'completed': ''}` } id={this.props.data.taskId}>
                <button onClick={(e) => removeTask(this.props.data.listId, this.props.data.taskId)}>X</button>
                <input 
                    type="checkbox" 
                    onChange={(e)=> 
                        markAsCompleted(
                            this.props.data.taskId, 
                            this.props.data.listId,
                            e.target.checked
                        )}
                    checked={this.props.data.completed}/>
                <div className="taskText">
                    {this.props.data.text}
                  </div>
            </div>
        );
    }
}
export default Task;