import axios from 'axios';

import { 
    put, 
    call, 
    takeLatest, 
    takeEvery,
    select 
} from 'redux-saga/effects';

import { 
    GET_CURRENCY_HISTORY, 
    getCurrencyHistorySuccess, 
    getCurrencyHistoryError 
} from '../actions/charthistory';

import { LOCATION_CHANGE  } from 'react-router-redux'; 

//set exchangeratesapi Base URL
const API_Base_URL = process.env.API_BASE_URL;

//get component state
const chartHistoryState = (state) => state.charthistory;
const currencyState = (state) => state.currency;

//perform rate checker
function* getCurrencyHistory(){

    //get current state of currency component.
    const { daterange } = yield select(chartHistoryState);
    //split date range. Date range comes in this format: YYYY-MM-DD - YYYY-MM-DD
    var splitDateRange = daterange.split(' - ');

    const { toData, fromData } = yield select(currencyState);
    const toCurrency = toData.currency;
    const fromAmount = fromData.value;
    const fromCurrency = fromData.currency;

    try {

        if(splitDateRange.length > 1){
            var fromDate = splitDateRange[0], toDate = splitDateRange[1];
            if(fromDate && toDate){

                //the call() function does not run axios directly. As generators work, it only returns the object for which you will run next() on.
                const getLatest = yield call(
                    axios.get,
                    `${API_Base_URL}history`,
                    {
                        params: {
                            base: fromCurrency,
                            symbols: toCurrency,
                            start_at: fromDate,
                            end_at: toDate
                        }
                    }
                );

                //getLatest.data is the response from the AXIOS call. From there onwards, you can parse the response from the API itself
                var rates = getLatest.data.rates;
                yield put(getCurrencyHistorySuccess(rates, fromAmount, toCurrency));

            }
        }
        
    } catch (error) {

        //put is Saga's middleware function for dispatching actions to the redux store
        yield put(getCurrencyHistoryError());
        
    }

}

export default function* (){
    //takeLatest basically takes the latest action that was called, and performs the function specified
    yield takeLatest(GET_CURRENCY_HISTORY, getCurrencyHistory);
    
    //on page load, get latest currency rate
    yield takeEvery(LOCATION_CHANGE, getCurrencyHistory);
}