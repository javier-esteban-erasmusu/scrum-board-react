import React from 'react';
import {changeColor} from '../store/actions';
import { CirclePicker} from 'react-color';
import './TaskColor.component.css';

class TaskColor extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            'color': props.color,
            'showPicker': false
        }
    }

    handleClick = () => {
        this.setState({'showPicker': true});
    }

    handleChangeColor = (color) => {
        changeColor(this.props.listId, this.props.taskId, color.hex);
        this.setState({'showPicker': false});
    } 

    render = () => (
        <div className='taskColor' style={{background: this.props.color}} onClick={this.handleClick}>
            
        
            {this.state.showPicker &&
                <CirclePicker 
                colors= {["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3"]}
                color= {this.props.color} 
                onChangeComplete={this.handleChangeColor} /> 
            }
        </div>
    )
}

export default TaskColor;