import {combineReducers} from 'redux';
import homePage from "./homePage";
import loginPage from './loginPage';


export default combineReducers({
    homePage,
    loginPage
});