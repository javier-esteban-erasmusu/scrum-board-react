import React from 'react';
import './List.component.css';
import TaskList from './TaskList.component.jsx';
import ListType from './List.type.js';
import {connect} from 'react-redux';
import {addNewTask, removeList, taskDrop} from '../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropTarget } from 'react-dnd';



const target = {
    drop(props, monitor, component)  {
        const taskDragged = monitor.getItem();
        taskDrop(taskDragged.listId, props.data.listId, taskDragged);
    }
}


function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}

class List extends React.Component {
    static propTypes = {
        data: ListType
    }

    constructor(props) {
        super(props);
        this.state = {
            newTaskName: ''
        }
    }
    handleInputChange = (e) => {
        this.setState({newTaskName: e.target.value})
    }
    handleAddNewTask = (e) => {
        if(e.keyCode === 13 || e.type === 'click') {
            addNewTask(this.state.newTaskName, this.props.data.listId)
            this.setState({newTaskName: ''})
        }
    }
    handleRemoveList = () => {
        removeList(this.props.data.listId)
    }

    render() {
        const {connectDropTarget} = this.props;
        return connectDropTarget(
            <div 
                className="list"
                id={this.props.data.listId} 
            >
                <div className="listHeader">
                    <h4>{this.props.data.name}
                        <button onClick={this.handleRemoveList}><FontAwesomeIcon icon="trash" /></button>
                    </h4>
                </div>
                <TaskList tasks={this.props.data.tasks}/>
                <div className="addTask">
                    <input 
                        type="text" 
                        value={this.state.newTaskName} 
                        onChange={this.handleInputChange} 
                        onKeyUp={this.handleAddNewTask} />
                    <button onClick={this.handleAddNewTask}>add task</button>
                </div>    
            </div>
        )
    }
}

const mapStateToProps = (state)  => ({lists: state.lists});

export default connect(
  mapStateToProps,
  null
)(DropTarget('task', target, collect) (List));
