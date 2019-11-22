import React, { Component } from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import axios from 'axios';

export default class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  getWeather = e => {
    e.preventDefault();
    const city = e.target.city.value.trim();
    const API_KEY = '4f84a93676c274604ae1c5ac5e4c549a';
    const url = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;
    if (city) {
      axios
        .get(url)
        .then(res => {
          const data = res.data;
          this.setState(() => ({
            temperature: Math.round(data.main.temp - 222),
            city: data.name,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: ''
          }));
        })
        .catch(err => {
          if (err) {
            this.setState(() => ({
              temperature: undefined,
              city: undefined,
              humidity: undefined,
              description: undefined,
              error: 'Please enter a valid city name'
            }));
          }
        });
    }
    e.target.reset();
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="title-container">
              <Titles />
            </div>
            <div className="form-container">
              <Form getWeather={this.getWeather} />
              <Weather
                temperature={this.state.temperature}
                city={this.state.city}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
