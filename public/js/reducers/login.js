export default (state = {tip:[]}, action) => {
    if(action.type === 'GET_LOGIN_TIP') {
        state.tip = action.data;
        return Object.assign({}, state);
    }
    return state;
}