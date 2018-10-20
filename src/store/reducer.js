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
                if (list.listId === action.newTask.listId) {
                    list.tasks.push(action.newTask)
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

        case 'REMOVE_TASK':
        {
            const newLists = state.lists.map(
                list => {
                    if (list.listId === action.listId) {
                        list.tasks = list.tasks.filter(
                            task => task.taskId !== action.taskId
                        )
                    }
                    return list;
                }
            );
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
                
            return { lists: newLists};
        }

        case 'CHANGE_TASK_TITLE':
        {
            const newLists = state.lists.map(list => {
                if(list.listId === action.listId) {
                    list.tasks = list.tasks.map(task => {
                    if(task.taskId === action.taskId) {
                        task.text = action.newTaskText;
                    }
                    return task;
                    })
                }
                return list
                }) ;
                
            return { lists: newLists};
        }

        case 'TOGGLE_TASK_TEXT_READ_ONLY':
        {
            const newLists = state.lists.map(list => {
                if(list.listId === action.listId) {
                    list.tasks = list.tasks.map(task => {
                    if(task.taskId === action.taskId) {
                        task.readOnly = action.value;
                    }
                    return task;
                    })
                }
                return list
                }) ;
                
            return { lists: newLists};
        }
        default:
            return state;
    }
}