import React from 'react';
import './List.component.css';
import Task from './Task.component.jsx';
import ListType from './List.type.js';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNewTask, removeList, taskDrop} from '../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    handleDragOver = (e) => {
        e.preventDefault();
    }

    handleDrop = (e, category) => {
        console.log(e);
        taskDrop(this.props.data.listId, this.props.data.taskId);
    }

    render() {
        return (
            <div 
                className="list"
                id={this.props.data.listId}
                onDragOver={(e) => this.handleDragOver(e)}
                onDrop = {(e) => this.handleDrop(e, 'testd')}    
            >
                <div className="listHeader">
                    <h4>{this.props.data.name}
                        <button onClick={this.handleRemoveList}><FontAwesomeIcon icon="trash" /></button>
                    </h4>
                </div>
                
                {this.props.data.tasks.map(taskData => 
                <Task 
                    data={taskData} 
                    onHandleMarkAsCompleted={this.props.onHandleMarkAsCompleted} 
                    key={taskData.taskId}/>)}

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
)(List);
