import request from 'superagent';

export default store => next => action => {
    if (action.type === "SEARCH_ORDER") {
        request.get(`/searchOrder/${action.orderNumber}`)
            // .send(action.info)
            .end((err, res) => {
            // console.log(res.body);
            next({type:"GET_SEARCH_ORDER_TIP", data:res.body});
            });
    }
    else
        next(action);
};