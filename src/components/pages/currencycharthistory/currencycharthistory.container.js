import { connect } from 'react-redux';
import CurrencyChartHistory from './currencycharthistory';

//import the actions that need to be dispatched here
import { dateChanged, getCurrencyHistory} from '../../../../actions/charthistory';

function mapStateToProps(state){
    return {
        history: state.charthistory.history,
        daterange: state.charthistory.daterange,
        fromCurrency: state.currency.fromData.currency,
        toCurrency: state.currency.toData.currency
    }
}

function mapDispatchToProps(dispatch){
    return {
        handleDateChanged: (daterange) => {
            dispatch(dateChanged(daterange));
            dispatch(getCurrencyHistory());
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyChartHistory);