import React, { Component } from 'react';
import GoogleMap from '@google/maps';
import { WeatherCurrent } from './WeatherCurrent';
import { WeatherDaily } from './WeatherDaily';
import { WeatherForescast } from './WeatherForescast';
import NotFound from './NotFound';

class WeatherSwitch extends Component {
  defaultState = {
    city: null,
    state: null,
    country: null,
    latitude: null,
    longitude: null,
    currentData: {},
    dailyData: {},
    hourlyData: {},
    allData: {},
    isCurrent: true,
    isDaily: false,
    isForecast: false,
    error: null,
    loading: true,
  }

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  getWeather = () => {
    this.setState({
      loading: true
    });
    const { latitude, longitude } = this.state;

    fetch(`/api/darksky?latitude=${latitude}&longitude=${longitude}`)
      .then(res => res.json())
      .then(result => {
        const currentData = result.currently;
        const dailyData = result.daily;
        const hourlyData = result.hourly;
        const allData = result
        this.setState({
          currentData,
          dailyData,
          hourlyData,
          allData,
          loading: false
        });
      },
        error => {
          this.setState({
            error
          });
        }
      )
  }

  getLocation = () => {
    const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }, () => this.getWeather());

        const googleMapsClient = GoogleMap.createClient({
          key: 'testingkey'
        });

        googleMapsClient.reverseGeocode({ latlng: [this.state.latitude, this.state.longitude] }, (err, response) => {
          if (!err) {
            let results = response.json.results;
            if (results.length > 0) {
              for (let i = 0; i < results.length; i++) {
                if (results[i].types[0] === "locality") {
                  var city = results[i].address_components[0].short_name;
                  var state = results[i].address_components[1].short_name;
                  var country = results[i].address_components[2].short_name;
                  this.setState({
                    city,
                    state,
                    country
                  });
                }
              }
            }
          }
        });
      });
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  switchForecastType = (foreType) => {
    switch (foreType) {
      case 'current':
        this.setState({
          isCurrent: true,
          isForecast: false,
          isDaily: false,
          loading: false
        });
        break;
      case 'daily':
        this.setState({
          isDaily: true,
          isCurrent: false,
          isForecast: false,
          loading: false
        });
        break;
      case 'forecast':
        this.setState({
          isForecast: true,
          isDaily: false,
          isCurrent: false,
          loading: false
        });
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        {this.state.loading ? this.renderLoading() : this.renderMain()}
      </div>
    )
  }

  renderLoading() {
    return (
      <div className="wrapper direction-column s-grid">
        <nav className="main-nav center">
          <ul className="s-grid">
            <li><a className="link-current">Current</a></li>
            <li><a className="link-daily">Daily</a></li>
            <li><a className="forecast">Hourly</a></li>
          </ul>
        </nav>
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
          </svg>
        </div>
      </div>
    )
  }

  renderMain() {
    const { isCurrent, isDaily, isForecast, currentData, dailyData, hourlyData, city } = this.state;
    let Panel = null;
    if (isCurrent) {
      Panel = <WeatherCurrent data={currentData} city={city} />
    }
    else if (isDaily) {
      Panel = <WeatherDaily data={dailyData} city={city} />
    }
    else if (isForecast) {
      Panel = <WeatherForescast data={hourlyData} city={city}/>
    }
    else {
      Panel = <NotFound />
    }

    return (
      <div className="s-grid direction-column ">
        <nav className="main-nav">
          <ul className="s-grid">
            <li><a className="link-current" onClick={() => this.switchForecastType('current')}>Current</a></li>
            <li><a className="link-daily" onClick={() => this.switchForecastType('daily')}>Daily</a></li>
            <li><a className="forecast" onClick={() => this.switchForecastType('forecast')}>Hourly</a></li>
          </ul>
        </nav>
        {Panel}
      </div>

    )
  }

}

export default WeatherSwitch;