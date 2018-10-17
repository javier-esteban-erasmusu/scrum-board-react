import initialState from 'initialState';

export default reducer(state = initialState, action)
{
    switch(action)
    {
        case 'ADD_NEW_LIST': 
        {
            return [...state.lists, action.list];
        }
        case 'ADD_NEW_LIST':
        {
            const newLists = prevState.lists.map( list => {
                if (list.listId === listId) {
                    list.tasks.push(newTask)
                }
                    return list;
            })
            return [...state.lists, newLists];    
        }

        case 'REMOVE_LIST':
        {
            const newLists = prevState.lists.filter( list => list.listId !== listId) ;
            return [...state.lists, newLists];
        }

        case 'MARK_AS_COMPLETED':
        {
            const newLists = prevState.lists.map(list => {
                if(list.listId === listId) {
                    list.tasks = list.tasks.map(task => {
                    if(task.taskId === taskId) {
                        task.completed = completedState;
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