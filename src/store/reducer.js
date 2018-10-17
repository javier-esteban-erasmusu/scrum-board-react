import initialState from 'initialState';

export default reducer(state = initialState, action)
{
    switch(action)
    {
        case 'ADD_NEW_LIST': 
            {
                return [...state.lists, action.list];
            }
        default:
            return state;
    }
}