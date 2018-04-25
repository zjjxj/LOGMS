const initState = {
    searchOrderTip:{},
    loginInfo:{}
}



export default (state = initState, action) => {
    if(action.type === "GET_SEARCH_ORDER_TIP") {
        console.log(action.data)
        state.searchOrderTip = action.data;
        return Object.assign({}, state);
    }else if(action.type === "GET_LOGIN_TIP"){
        console.log("data",action.data)

    }
    return state;
}