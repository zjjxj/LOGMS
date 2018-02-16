import Login from "../components/login";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        loginTip: state.login.tip
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        onLogin:(info)=>{
            dispatch({type:"LOGIN_SUBMIT",info});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);