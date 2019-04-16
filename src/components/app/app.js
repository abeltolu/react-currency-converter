import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

export default function App({children}){
    return (
        <section className="main__content">
            <div className="main__container">
                
                <div className="page__header">
                    <h1 className="page__title">Currency Converter</h1>
                    <p className="page__title__small">Today, {dayjs().format('YYYY-MM-DD HH:mm')}</p>
                </div>
                
                {children}

            </div>
        </section>
    )
}

App.propTypes = {
}