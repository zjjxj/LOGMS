import loginPage from "../components/loginPage";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        searchOrderTip: state.homePage.searchOrderTip
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        onLogin:(info)=>{
            dispatch({type:"LOGIN_SUBMIT",info});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginPage);