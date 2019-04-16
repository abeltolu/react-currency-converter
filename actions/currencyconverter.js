//action names
export const PERFORM_CURRENCY_CONVERSION = 'PERFORM_CURRENCY_CONVERSION';
export const CONVERT_CURRENCY_SUCCESS = 'CONVERT_CURRENCY_SUCCESS';
export const CONVERT_CURRENCY_ERROR = 'CONVERT_CURRENCY_ERROR';
export const NEW_CONVERSION = 'NEW_CONVERSION';
export const CURRENCY_CHANGED = 'CURRENCY_CHANGED';
export const CURRENCY_SWAPPED = 'CURRENCY_SWAPPED';

//action creators = functions that create actions

export const newConversion = (fromCurrency, toCurrency, amount) => ({
    type: NEW_CONVERSION,
    fromCurrency, toCurrency, amount
})

export const performCurrencyConversion = () => ({
    type: PERFORM_CURRENCY_CONVERSION
});

export const currencyConversionSuccess = (conversion) => ({
    type: CONVERT_CURRENCY_SUCCESS,
    conversion
});

export const currencyChanged = (selection, currency) => ({
    type: CURRENCY_CHANGED,
    selection, currency
});

export const currencySwapped = () => ({
    type: CURRENCY_SWAPPED
});

export const currencyConversionError = () => ({
    type: CONVERT_CURRENCY_ERROR
});