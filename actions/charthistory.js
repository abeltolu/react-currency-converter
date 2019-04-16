//action names
export const DATE_CHANGED = 'DATE_CHANGED';
export const GET_CURRENCY_HISTORY = 'GET_CURRENCY_HISTORY';
export const GET_CURRENCY_HISTORY_SUCCESS = 'GET_CURRENCY_HISTORY_SUCCESS';
export const GET_CURRENCY_HISTORY_ERROR = 'GET_CURRENCY_HISTORY_ERROR';

//action creators = functions that create actions

export const dateChanged = (daterange) => ({
    type: DATE_CHANGED,
    daterange
});

export const getCurrencyHistory = () => ({
    type: GET_CURRENCY_HISTORY
});

export const getCurrencyHistorySuccess = (history, fromAmount, toCurrency) => ({
    type: GET_CURRENCY_HISTORY_SUCCESS,
    history,
    toCurrency,
    fromAmount
});

export const getCurrencyHistoryError = () => ({
    type: GET_CURRENCY_HISTORY_ERROR,
});