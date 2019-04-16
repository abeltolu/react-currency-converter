//get component actions
import { 
    CONVERT_CURRENCY_SUCCESS, 
    CONVERT_CURRENCY_ERROR, 
    PERFORM_CURRENCY_CONVERSION, 
    NEW_CONVERSION, 
    CURRENCY_CHANGED,
    CURRENCY_SWAPPED
} from '../actions/currencyconverter';

//get list of all currencies
import { CURRENCY_OPTIONS } from '../src/static/currenciesData';

//we need this to reset state to initial state when the page is changed
import { LOCATION_CHANGE  } from 'react-router-redux'; 

//define the initial state of the action before any actions are dispatched
const initialState = {
    fromData: {
        currency: 'EUR',
        symbol: "€",
        value: 1
    },
    toData: {
        currency: 'USD',
        symbol: "$",
        value: 0
    },
    conversion: {},
    isLoading: false,
    countryOptions: CURRENCY_OPTIONS
};

export default (state, action) => {
    if(state === undefined){
        return initialState;
    }

    //implement switch case on each actions
    switch(action.type){
        case CONVERT_CURRENCY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                toData: {
                    ...state.toData,
                    value: action.conversion
                }
            }

        case NEW_CONVERSION:
            return {
                ...state,
                conversion: {},
                isLoading: true,
                fromData: {
                    ...state.fromData,
                    currency: action.fromCurrency,
                    value: action.amount
                },
                toData: {
                    ...state.toData,
                    currency: action.toCurrency
                }
            }

        case CURRENCY_CHANGED:
            
            //get the currency symbol from array of all currencies
            const filterCurrencies = CURRENCY_OPTIONS.filter(cur => cur.value == action.currency);
            const symbol = filterCurrencies.length > 0 && filterCurrencies[0].symbol;
        
            return {
                ...state,
                [action.selection]: {
                    ...state[action.selection],
                    currency: action.currency,
                    symbol,
                }
            }

        case CURRENCY_SWAPPED:
            return {
                ...state,
                fromData: {
                    ...state.toData,
                    value: state.fromData.value
                },
                toData: {
                    ...state.fromData,
                    value: state.fromData.toData
                },
            }

        case PERFORM_CURRENCY_CONVERSION:
            return {
                ...state,
                isLoading: true
            }

        case CONVERT_CURRENCY_ERROR: 
            return {
                ...state,
                isLoading: false
            }

        case LOCATION_CHANGE:
            return initialState;

        default:
            return state;

    }
}