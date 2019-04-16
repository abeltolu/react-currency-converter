import { connect } from 'react-redux';
import CurrencyConverter from './currencyconverter';

//import the actions that need to be dispatched here
import { newConversion, performCurrencyConversion, currencyChanged, currencySwapped } from '../../../../actions/currencyconverter';

import {getCurrencyHistory} from '../../../../actions/charthistory';

function mapStateToProps(state){
    return {
        fromData: state.currency.fromData,
        toData: state.currency.toData,
        conversion: state.currency.conversion,
        isLoading: state.currency.isLoading,
        countryOptions: state.currency.countryOptions
    }
}

function mapDispatchToProps(dispatch){
    return {
        handleCurrencyConversion: (fromCurrency, toCurrency, amount) => {
            dispatch(newConversion(fromCurrency, toCurrency, amount));
            dispatch(performCurrencyConversion());
            dispatch(getCurrencyHistory());
        },

        handleCurrencyChanged: (selection, currency) => {
            dispatch(currencyChanged(selection, currency));
            dispatch(performCurrencyConversion());
            dispatch(getCurrencyHistory());
        },

        handleCurrencySwap: () => {
            dispatch(currencySwapped());
            dispatch(performCurrencyConversion());
            dispatch(getCurrencyHistory());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter);