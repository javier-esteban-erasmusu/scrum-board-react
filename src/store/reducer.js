import {initialState} from './initialState';

export function reducer(state = initialState, action)
{
    
    switch(action.type)
    {
        case 'ADD_NEW_LIST': 
            return {...state,lists: [...state.lists, action.newList]};
        
        case 'ADD_NEW_TASK':
        {
            const newLists = state.lists.map( list => {
                if (list.listId === action.newTask.listId) {
                    list.tasks.push(action.newTask)
                }
                    return list;
            })
            return {...state,lists: newLists};
        }

        case 'REMOVE_LIST':
        {
            const newLists = state.lists.filter( list => list.listId !== action.listId) ;
            return {...state, lists: newLists};
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
            return {...state, lists: newLists};
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
                
            return {...state, lists: newLists};
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
                
            return {...state, lists: newLists};
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
                
            return {...state, lists: newLists};
        }

        case 'CHANGE_COLOR':
        {
            const newLists = state.lists.map(list => {
                if(list.listId === action.listId) {
                    list.tasks = list.tasks.map(task => {
                    if(task.taskId === action.taskId) {
                        task.color = action.color;
                    }
                    return task;
                    })
                }
                return list
                }) ;
                
            return {...state, lists: newLists};
        }

        case 'TASK_DROP':
        {
            const ListsTaskRemoved = state.lists.map(
                list => {
                    if (list.listId === action.sourceListId) {
                        list.tasks = list.tasks.filter(
                            task => task.taskId !== action.taskDragged.taskId
                        )
                    }
                    return list;
                }
            );

            const newLists = ListsTaskRemoved.map(
                list => {
                    if (list.listId === action.targetListId) {
                        const newTask = {...action.taskDragged, listId: action.targetListId }
                        list.tasks.push(newTask);
                    }
                    return list;
                }
            );

            return {...state,lists: newLists};
        }

        default:
            return state;
    }
}