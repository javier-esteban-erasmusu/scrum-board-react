import React from 'react';
import TaskType from './Task.type.js';
import './Task.component.css';

class Task extends React.Component {
    static propTypes = {
        data: TaskType
    }
    render () {
        return (
            <div className={`taskItem ${this.props.data.completed ? 'completed': ''}` } id={this.props.data.taskId}>
                <button>X</button>
                <input 
                    type="checkbox" 
                    onChange={(e)=> 
                        this.props.onHandleMarkAsCompleted(
                            this.props.data.taskId, 
                            this.props.data.listId,
                            e.target.checked
                        )}/>
                <div className="taskText">
                    {this.props.data.text}
                  </div>
            </div>
        );
    }
}
export default Task;