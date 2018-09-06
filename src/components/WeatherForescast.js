import React from 'react';
import { convertFahrenheitToCelsius, unixTimeToDate } from '../helpers/utils';
import '../styles/weather-icons-wind.min.css';
import '../styles/weather-icons.min.css';
import '../styles/Forescast.css';

export const WeatherForescast = (props) => {
  return (
    <section className="wrapper">
      <header>
        <h4><i className="fa fa-map-marker" aria-hidden="true"></i>{props.city}</h4>
      </header>
      <div className="fiveDayForecast">
        {props.data.data.map(item =>
          <div key={item.time} className="s-grid direction-column vertical-card center">
            <div className="main-info s-block center">
              <span className="s-block time s-grid direction-column">{unixTimeToDate(item.time)}</span>
              <div><i className={'weather-icon wi wi-forecast-io-' + item.icon}></i></div>
              <div>{item.summary}</div>
            </div>
            <div className="s-block other-info">
              <span>{convertFahrenheitToCelsius(item.temperature)}<i className="wi wi-celsius"></i></span>
              <div className="other s-block">
                <span>{item.humidity * 100}<i className="wi wi-humidity"></i></span>
                <div className="wind">
                  <span><i className={'wi wi-wind-beaufort-' + Math.round(item.windSpeed)}></i></span>
                  <span><i className={'wi wi-wind from-' + Math.round(item.windBearing) + '-deg'}></i></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}