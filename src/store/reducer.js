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
        default:
            return state;
    }
}