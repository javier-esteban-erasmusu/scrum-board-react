import {store} from './index.js';

export const addNewList = (addNewListText) => {
    const newList = {
                "listId": generateId('list'),
                "name": addNewListText,
                "tasks": []
            }
    store.dispatch({type: 'ADD_NEW_LIST', newList: newList}); 
}

export const addNewTask = (taskName, listId) => {
    const newTask = {
        "taskId": generateId('task'),
        "text": taskName,
        "completed": false,
        "color": "white",
        "listId": listId,
        "readOnly": true
    }
    
    store.dispatch({type: 'ADD_NEW_TASK', newTask: newTask});
}

export const removeTask = (listId, taskId) => {store.dispatch({type:'REMOVE_TASK', listId, taskId})};

export const removeList = (listId) => {store.dispatch({type: 'REMOVE_LIST', listId})};
    
export const markAsCompleted = (taskId,listId, completedState) => {
    store.dispatch(
        {type: 'MARK_AS_COMPLETED', taskId: taskId, listId: listId, completedState:completedState}
    )
};

export const changeTaskTextReadOnly = (taskId,listId, value) => {
    store.dispatch(
        {type: 'TOGGLE_TASK_TEXT_READ_ONLY', taskId, listId, value}
    )
};

export const changeTaskText = (listId, taskId, newTaskText) => {store.dispatch({type: 'CHANGE_TASK_TITLE', listId, taskId, newTaskText})};

export const changeColor = (listId, taskId, color) => {store.dispatch({type:'CHANGE_COLOR',listId, taskId, color })}

export const taskDragStart = (listId, taskId) => {store.dispatch({type: 'TASK_START_DRAG', listId, taskId})};


export const taskDrop = (listId, taskId) => {store.dispatch({type: 'TASK_DROP', listId,taskId})};

const generateId = (namespace)  => {
    return `${namespace}-${Date.now()}-${Math.round(Math.random()*100)}`
}