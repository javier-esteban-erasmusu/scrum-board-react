import React from 'react';
import TaskType from './Task.type.js';
import TaskColor from './TaskColor.component';
import {markAsCompleted, removeTask, changeTaskTextReadOnly, changeTaskText, changeColor} from '../store/actions';
import './Task.component.css';

class Task extends React.Component {
    static propTypes = {
        data: TaskType
    }

    constructor( props ) {
        super( props );
        this.state = {
            'taskText': props.data.text,
        }
    }

    handleInputChange = (e) => {
        this.setState({taskText: e.target.value})
    }
    
    handleKeyup = (e) => {
    if(e.keyCode === 13) {
        changeTaskText(this.props.data.listId, this.props.data.taskId, this.state.taskText);
        changeTaskTextReadOnly(this.props.data.taskId,this.props.data.listId, true);
    }
    } 

    render () {
        return (
            <div 
                className={`taskItem ${this.props.data.completed ? 'completed': ''}` } 
                id={this.props.data.taskId}                 
            >
                <button onClick={(e) => removeTask(this.props.data.listId, this.props.data.taskId)}>X</button>
                <TaskColor color={this.props.data.color} listId={this.props.data.listId} taskId={this.props.data.taskId} />
                {this.props.data.readOnly && <input 
                    type="checkbox"
                    onChange={(e)=> 
                        markAsCompleted(
                            this.props.data.taskId, 
                            this.props.data.listId,
                            e.target.checked
                        )}
                    checked={this.props.data.completed}/>}
                    <div className="taskText">

                    {this.props.data.readOnly 
                        ?  <div onClick={() => changeTaskTextReadOnly(this.props.data.taskId,this.props.data.listId, false)}>{this.props.data.text}</div>
                        : (<input type="text" value={this.state.taskText} onChange={this.handleInputChange} onKeyUp={this.handleKeyup}/>)}
                    </div>
            </div>
        );
    }
}
export default Task;