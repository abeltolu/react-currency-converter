import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { COUNTRY_OPTIONS } from '../../../static/countriesData';

export default class CurrencyConverter extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            fromData: {
                currency: 'NGN',
                symbol: "N",
                value: 0
            },
            toData: {
                currency: 'USD',
                symbol: "$",
                value: 0
            }
        }
    }

    componentDidMount(){}

    //swap currency on click.
    handleCurrencySwap = (e) => {
        const { fromData, toData } = this.state;
        this.setState({
            fromData: toData,
            toData: fromData
        });
    }

    //change currency
    handleCurrencyChange = (selection, currency) => {
        
        if(selection && currency){
            //get currency symbol
            const filterCurrencies = COUNTRY_OPTIONS.filter(cur => cur.value == currency);
            const symbol = filterCurrencies.length > 0 && filterCurrencies[0].symbol;

            //use spread to keep previous data, and replace only 'currency'
            this.setState(prevState => ({
                [selection]: {
                    ...prevState[selection],
                    //set currency and symbol
                    currency, symbol
                }
            }));
        }
    }

    //handle value change
    handleValueChange = (amount) => {
        this.setState(prevState => ({
            fromData: {
                ...prevState.fromData,
                value: amount
            }
        }));
    }

    render(){
        return (
            <div className="converter">
                <div className="from__container">
                    <div className="top_title">From</div>
                    <div className="converter__select">
                    <Dropdown
                        placeholder='Select Currency'
                        fluid
                        search
                        selection
                        value={this.state.fromData.currency}
                        onChange={ (e, data) => this.handleCurrencyChange("fromData", data.value)}
                        options={COUNTRY_OPTIONS}
                    />
                    </div>
                    <div className="coverter__input">
                        <span className="currency">{this.state.fromData.symbol}</span>
                        <input className="" placeholder="0" onChange={e => this.handleValueChange(e.target.value)} />
                    </div>
                </div>
                <div className="swap__container">
                    <div className="swap__container__mini" onClick={this.handleCurrencySwap}>
                        <i className="icon ion-md-swap"></i>
                    </div>
                </div>
                <div className="to__container">
                    <div className="top_title">To</div>
                    <div className="converter__select">
                        <Dropdown
                            placeholder='Select Currency'
                            fluid
                            search
                            selection
                            value={this.state.toData.currency}
                            onChange={ (e, data) => this.handleCurrencyChange("toData", data.value)}
                            options={COUNTRY_OPTIONS}
                        />
                    </div>
                    <div className="coverter__input">
                        <span className="currency">{this.state.toData.symbol}</span>
                        <input className="" placeholder="0" readOnly />
                    </div>
                </div>
            </div>
        )
    }
}

CurrencyConverter.propTypes = {}