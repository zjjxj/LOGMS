import request from 'superagent';

export default store => next => action => {
    if (action.type === "LOGIN_SUBMIT") {
        console.log(action.info)

        request.post(`/login`)
            .send(action.info)
            .end((err, res) => {
                console.log(res.body);

                next({type:"GET_LOGIN_TIP", data:res.body});
            });
    }
    else
        next(action);
};