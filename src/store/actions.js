import store from 'store';

export const  addNewList = (addNewListText) => {
    const newList = {
                "listId": this.generateId('list'),
                "name": addNewListText,
                "tasks": []
            }
    
    return {type: 'ADD_NEW_LIST', newList: newList}        
}