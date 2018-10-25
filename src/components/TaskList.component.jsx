import React from 'react';
import Task from './Task.component.jsx';
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
  } from 'react-sortable-hoc';


const DragHandle = SortableHandle(() =>  <span>::</span>); // This can be any component you want

const SortableItem = SortableElement(({value}) => {
    return (
        <li>
        <DragHandle />
        <Task
            data={value} 
            key={value.taskId}/>
        </li>
    );
});
  
const SortableList = SortableContainer(({items}) => {
    return (
    <ul>
        {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
    </ul>
    );
});

class TaskList extends React.Component {

    constructor( props ) {
        super( props );
    }    

    render = () => (
        <SortableList items={this.props.tasks} onSortEnd={this.onSortEnd} useDragHandle={true} />
    )
}

export default TaskList;












