import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat)

//get component actions
import { 
    DATE_CHANGED,
    GET_CURRENCY_HISTORY,
    GET_CURRENCY_HISTORY_SUCCESS,
    GET_CURRENCY_HISTORY_ERROR
} from '../actions/charthistory';

//we need this to reset state to initial state when the page is changed
import { LOCATION_CHANGE  } from 'react-router-redux'; 

//define the initial state of the action before any actions are dispatched
const initialState = {
    daterange: `${dayjs().subtract(3, 'weeks').format('YYYY-MM-DD')} - ${dayjs().format('YYYY-MM-DD')}`,
    history: []
};

function chartHistoryTransformer(rates, fromAmount, toCurrency){

    //sort rates in ascending order
    var ratesSorted = Object.keys(rates).sort();
    var data = ratesSorted.map((date) => {
        var obj = rates[date];
        var rate = obj[toCurrency];
        return {
            name: dayjs(date).format('MMM Do, YYYY'),
            smallname: dayjs(date).format('MMM Do'),
            rate: new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: false }).format(rate)
        }
    });

    //return an object that matched the required data in our lib/customTypes
    return data;
}

export default (state, action) => {
    if(state === undefined){
        return initialState;
    }

    //implement switch case on each actions
    switch(action.type){
        case DATE_CHANGED:
            return {
                ...state,
                daterange: action.daterange
            }
        
        case GET_CURRENCY_HISTORY_SUCCESS:
            return {
                ...state,
                history: chartHistoryTransformer(action.history, action.fromAmount, action.toCurrency)
            }

        case GET_CURRENCY_HISTORY:
            return {
                ...state
            }

        case GET_CURRENCY_HISTORY_ERROR:
            return {
                ...state
            }

        case LOCATION_CHANGE:
            return initialState;

        default:
            return state;

    }
}