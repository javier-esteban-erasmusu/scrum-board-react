import React from 'react';
import TaskType from './Task.type.js';
import TaskColor from './TaskColor.component';
import {markAsCompleted, removeTask, changeTaskTextReadOnly, changeTaskText} from '../store/actions';
import './Task.component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragSource } from 'react-dnd';


const itemSource = {
    beginDrag(props) {
        return props.data;
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}


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
        const {isDragging, connectDragSource, data } = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(
            <div 
                className={`taskItem ${data.completed ? 'completed': ''}` } 
                id={data.taskId}
                style ={{opacity}}
            >
                <button onClick={(e) => removeTask(data.listId, data.taskId)}>
                <FontAwesomeIcon icon="trash" />
                </button>
                <TaskColor color={data.color} listId={data.listId} taskId={data.taskId} />
                {data.readOnly && <input 
                    type="checkbox"
                    onChange={(e)=> 
                        markAsCompleted(
                            data.taskId, 
                            data.listId,
                            e.target.checked
                        )}
                    checked={data.completed}/>}
                    <div className="taskText">

                    {data.readOnly 
                        ?  <div onClick={() => changeTaskTextReadOnly(data.taskId,data.listId, false)}>{data.text}</div>
                        : (<input type="text" value={this.state.taskText} onChange={this.handleInputChange} onKeyUp={this.handleKeyup}/>)}
                    </div>
            </div>
        );
    }
}
export default DragSource('task', itemSource, collect)(Task);