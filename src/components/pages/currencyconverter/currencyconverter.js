import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CurrencyChartHistory from '../currencycharthistory/currencycharthistory.container';

export default function CurrencyConverter({ toData, fromData, isLoading, countryOptions, handleCurrencySwap, handleCurrencyChanged, handleCurrencyConversion }) {
        
    return (
        <div className="main">

            {/**BEGIN Currency Converter */}
            <div className="converter">
                
                {/** BEGIN FROM CURRENCY CONTAINER */}
                <div className="from__container">
                    <div className="top_title">From</div>
                    <div className="converter__select">
                    <Dropdown
                        placeholder='Choose your currency'
                        fluid
                        search
                        selection
                        loading={isLoading}
                        value={fromData.currency}
                        onChange={ (e, data) => handleCurrencyChanged("fromData", data.value)}
                        options={countryOptions}
                    />
                    </div>
                    <div className="coverter__input">
                        <span className="currency">{fromData.symbol}</span>
                        <input className="" placeholder="0" value={fromData.value} onChange={e => {
                            const amount = e.target.value;
                            handleCurrencyConversion(fromData.currency, toData.currency, amount);
                        }} />
                    </div>
                </div>
                {/** END FROM CURRENCY CONTAINER */}


                {/** BEGIN CURRENCY SWAP CONTAINER */}
                <div className="swap__container">
                    <div className="swap__container__mini" onClick={() => handleCurrencySwap()}>
                        <i className="icon ion-md-swap"></i>
                    </div>
                </div>
                {/** END CURRENCY SWAP CONTAINER */}


                {/** BEGIN TO CURRENCY CONTAINER */}
                <div className="to__container">
                    <div className="top_title">To</div>
                    <div className="converter__select">
                        <Dropdown
                            placeholder='Choose your currency'
                            fluid
                            search
                            selection
                            value={toData.currency}
                            onChange={ (e, data) => handleCurrencyChanged("toData", data.value)}
                            options={countryOptions}
                        />
                    </div>
                    <div className="coverter__input">
                        <span className="currency">{toData.symbol}</span>
                        <input className="" placeholder="0" value={toData.value} readOnly />
                    </div>
                </div>
                {/** END TO CURRENCY CONTAINER */}

            </div>
            {/**END Currency Converter */}

            {/**BEGIN Currency Chart History */}
            <CurrencyChartHistory/>
            {/**END Currency Converter */}

        </div>
    );
}

//get props from container
CurrencyConverter.propTypes = {
    fromData: PropTypes.object.isRequired,
    toData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    conversion: PropTypes.object.isRequired,
    countryOptions: PropTypes.array.isRequired,
    handleCurrencySwap: PropTypes.func.isRequired,
    handleCurrencyChanged: PropTypes.func.isRequired,
    handleCurrencyConversion: PropTypes.func.isRequired
}