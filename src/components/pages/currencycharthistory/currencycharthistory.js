import React, {PureComponent} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

class CustomizedLabel extends PureComponent {
    render() {
      const {
        x, y, stroke, value,
      } = this.props;
  
      return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
    }
}

export default function CurrencyChartHistory({history, daterange, fromCurrency, toCurrency, handleDateChanged}){
    
    return (
        <div className="currency__chart__history">
            
            <div className="chart__view__menu">
                <div className="cv__menu__item">
                    Historical Record of <strong>{fromCurrency}</strong> to <strong>{toCurrency}</strong>
                </div>
                <div className="cv__menu__item chart__date__range">
                    <span>Choose Date:</span>
                    <DatesRangeInput
                        value={daterange}
                        placeholder="From - To"
                        dateFormat="YYYY-MM-DD"
                        maxDate={dayjs().format()}
                        onChange={ (e, {name, value}) => handleDateChanged(value) }
                    />
                </div>
            </div>
            
            <ResponsiveContainer aspect={3}>

                <ComposedChart
                    data={history}
                    margin={{
                        top: 20, bottom: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="smallname" />
                    <Tooltip />
                    <Legend />
                    <Bar fontSize={12} dataKey="rate" label="USD" barSize={20} fill="#4987DF" />
                    <Line type="monotone" dataKey="rate" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

CurrencyChartHistory.propTypes = {
    history: PropTypes.array.isRequired,
    daterange: PropTypes.string.isRequired,
    fromCurrency: PropTypes.string.isRequired,
    toCurrency: PropTypes.string.isRequired,
    handleDateChanged: PropTypes.func.isRequired
}