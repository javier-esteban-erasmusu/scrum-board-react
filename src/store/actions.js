import store from './store';

export const addNewList = (addNewListText) => {
    const newList = {
                "listId": this.generateId('list'),
                "name": addNewListText,
                "tasks": []
            }
    store.dispatch({type: 'ADD_NEW_LIST', newList: newList}); 
}

export const addNewTask = (taskName, listId) => {
    const newTask = {
        "taskId": this.generateId('task'),
        "text": taskName,
        "completed": false,
        "color": "white",
        "listId": listId
    }
    
    store.dispatch({type: 'ADD_NEW_TASK', newTask: newTask});
}

export const removeList = (listId) => {store.dispatch({type: 'REMOVE_LIST', listId})};
    
export const markAsCompleted = (taskId,listId, completedState) => {
    store.dispatch(
        {type: 'MARK_AS_COMPLETED', taskId: taskId, listId: listId, completedState:completedState}
    )
};

generateId = (namespace)  => {
    return `${namespace}-${Date.now()}-${Math.round(Math.random()*100)}`
}