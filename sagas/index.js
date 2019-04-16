import { all, call } from 'redux-saga/effects';
import CurrencyConverterSaga from './/currencyconverter';
import ChartHistorySaga from './charthistory';

function* watchAll() {
  yield all([
    call(CurrencyConverterSaga),
    call(ChartHistorySaga)
  ]);
}

export default watchAll;