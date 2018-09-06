import React from 'react';
import { convertFahrenheitToCelsius, unixTimeToDate, getDay } from '../helpers/utils';
import '../styles/weather-icons-wind.min.css';
import '../styles/weather-icons.min.css';
import '../styles/font-awesome/css/font-awesome.min.css';


export const WeatherCurrent = (props) => {
  return (
    <div>
      <section className="wrapper s-grid center direction-column">
        <section className="card s-grid direction-column center">
          <div className="city">
            <h4><i className="fa fa-map-marker" aria-hidden="true"></i>{props.city}</h4>
          </div>
          <span className="s-block time">{unixTimeToDate(props.data.time)}</span>
          <i className={'weatherIcon wi wi-forecast-io-' + props.data.icon}></i>
          <span>{convertFahrenheitToCelsius(props.data.temperature)}<i className="wi wi-celsius"></i></span>
          <div className="secondaryTemp center">
            <span className="s-block">Feels like {convertFahrenheitToCelsius(props.data.temperature)}<i className="wi wi-celsius"></i></span>
          </div>
          <span className="mainWeather">{props.data.summary}</span>
          <span className="week">{getDay(props.data.time)}</span>
          <div className="mainInfo s-block">
            <div className="wind">
              <span><i className={'wind-icon wi wi-wind-beaufort-' + props.data.windSpeed}></i>{props.data.windSpeed} mph</span>
              <i className={'wi wi-wind from-' + props.data.windBearning + '-deg'}></i>
            </div>
          </div>
          <div className="otherInfo s-grid direction-column">
            <span>Humidity <span>:</span> {props.data.humidity * 100}<i className="wi wi-humidity"></i></span>
          </div>
        </section>
      </section>
    </div>
  )
}