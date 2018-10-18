import {initialState} from './initialState';

export function reducer(state = initialState, action)
{
    
    switch(action.type)
    {
        case 'ADD_NEW_LIST': 
            return {lists: [...state.lists, action.newList]};
        
        case 'ADD_NEW_TASK':
        {
            const newLists = state.lists.map( list => {
                if (list.listId === action.listId) {
                    list.tasks.push(action.taskName)
                }
                    return list;
            })
            return {lists: newLists};
        }

        case 'REMOVE_LIST':
        {
            const newLists = state.lists.filter( list => list.listId !== action.listId) ;
            return {lists: newLists};
        }

        case 'MARK_AS_COMPLETED':
        {
            const newLists = state.lists.map(list => {
                if(list.listId === action.listId) {
                    list.tasks = list.tasks.map(task => {
                    if(task.taskId === action.taskId) {
                        task.completed = action.completedState;
                    }
                    return task;
                    })
                }
                return list
                }) ;
                
            return [...state.lists, newLists];
        }
        default:
            return state;
    }
}