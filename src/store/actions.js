import store from 'store';

export const addNewList = (addNewListText) => {
    const newList = {
                "listId": this.generateId('list'),
                "name": addNewListText,
                "tasks": []
            }
    
    return {type: 'ADD_NEW_LIST', newList: newList}        
}

export const addNewTask = (taskName, listId) => {
    const newTask = {
        "taskId": this.generateId('task'),
        "text": taskName,
        "completed": false,
        "color": "white",
        "listId": listId
    }
    
    return {type: 'ADD_NEW_TASK', newTask: newTask};
}

export const removeList = (listId) => ({type: 'REMOVE_LIST', listId});
    