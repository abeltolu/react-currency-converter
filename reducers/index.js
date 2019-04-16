import {combineReducers} from 'redux';
import currencyConverterReducer from './currencyconverter';
import chartHistoryReducer from './charthistory';

//import touterReducer for routes and history push
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    router: connectRouter(history),
    currency: currencyConverterReducer,
    charthistory: chartHistoryReducer
});