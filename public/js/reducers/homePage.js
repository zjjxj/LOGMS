export default (state = {searchOrderTip:{}}, action) => {
    if(action.type === "GET_SEARCH_ORDER_TIP") {
        console.log(action.data)
        state.searchOrderTip = action.data;
        return Object.assign({}, state);
    }
    return state;
}