import AdminPage from "../components/adminPage";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        searchOrderTip: state.homePage.searchOrderTip
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchBtn:(orderNumber)=>{
            dispatch({type:"SEARCH_ORDER",orderNumber});
        }
        ,
        onLogin:(info)=>{
            dispatch({type:"LOGIN_SUBMIT",info});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);