import request from 'superagent';

export default store => next => action => {
    if (action.type === 'LOGIN_SUBMIT') {
        request.post('/login')
            .send(action.info)
            .end((err, res) => {
                next({type:"GET_LOGIN_TIP", data:JSON.parse(res.body)});
            });
    }
    else
        next(action);
};