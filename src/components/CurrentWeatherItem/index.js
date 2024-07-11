import { useSyncExternalStore } from 'react';
import { weatherStore  } from '../../store/weather.js';

import { useState, useEffect } from 'react';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faTint, faSmog, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt, faExclamationTriangle, faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function CurrentWeatherItem(props){
    
    const weatherStoreCurrent = useSyncExternalStore(weatherStore.subscribe, weatherStore.getSnapshot);

    const [weatherData, setWeatherData] = useState({
        currentCity: '',
        country: '',
        icon: '',
        main: '',
        description: '',
        temp_max: null,
        temp_min: null,
        feels_like: null,
        sunrise: null,
        sunset: null,
        keyId: null,
        dtValue: null,
        lon: null,
        lat: null,
        timezone: null,
        windSpeed: null,
        visibility: null,
        humidity: null,
        pressure: null,
        temp: null
      });
    
    useEffect(() => {
        if (weatherStoreCurrent) {
          setWeatherData({
            currentCity: weatherStoreCurrent.name || '',
            country: weatherStoreCurrent.sys?.country || '',
            icon: weatherStoreCurrent.weather[0]?.icon || '04d',
            main: weatherStoreCurrent.weather[0]?.main || '',
            description: weatherStoreCurrent.weather[0]?.description || '',
            temp_max: weatherStoreCurrent.main.temp_max || null,
            temp_min: weatherStoreCurrent.main.temp_min || null,
            feels_like: weatherStoreCurrent.main.feels_like || null,
            humidity: weatherStoreCurrent.main.humidity || null,
            pressure: weatherStoreCurrent.main.pressure || null,
            temp: weatherStoreCurrent.main?.temp || null,
            sunrise: weatherStoreCurrent.sys?.sunrise || null,
            sunset: weatherStoreCurrent.sys?.sunset || null,
            keyId: weatherStoreCurrent.id || null,
            dtValue: weatherStoreCurrent.dt || null,
            timezone: weatherStoreCurrent.timezone || null,
            lon: weatherStoreCurrent.coord?.lon || null,
            lat: weatherStoreCurrent.coord?.lat || null,
            windSpeed: weatherStoreCurrent.wind?.speed || null,
            visibility: weatherStoreCurrent.visibility || null
          });
        };
      }, [weatherStoreCurrent]);

// class Name of Container
    useEffect(() => {
        let containerClassName = 'wr-day-container';
        if (weatherData.main !== '') {
            if (weatherData.main.includes('Clear')) {
                containerClassName = 'wr-day-container sunny';
            } else if (weatherData.main.includes('Clouds') || weatherData.main.includes('Fog')) {
                containerClassName = 'wr-day-container clouds';
            } else if (weatherData.main.includes('Rain') || weatherData.main.includes('Storm') ) {
                containerClassName = 'wr-day-container rain';
            } else if (weatherData.main.includes('Snow') || weatherData.main.includes('Mist')) {
                containerClassName = 'wr-day-container snow';
            }
        }
        const dateTimeMillis = (weatherData.dtValue + weatherData.timezone) * 1000;
        const date = new Date(dateTimeMillis);
        const hours = date.getHours();
        let timeOfDay;
        if (hours >= 6 && hours < 18) {
          timeOfDay = 'day';
        } else if (hours >= 18 || hours < 6) {
          timeOfDay = 'night';
        }

        props.setTimeOfDayLocal(timeOfDay);
        props.setContainerClassNameLocal(containerClassName);
        props.setCurrentLocationLocal({
          currentCity: weatherData.currentCity,
          country: weatherData.country,
          timezone: weatherData.timezone,
          sunrise: weatherData.sunrise,
          sunset: weatherData.sunset,
          dtValue: weatherData.dtValue
        })
      }, [weatherData, props]);

// кельвін → цельсій
function temperatureInCelcius(temp) {
    return Math.round(temp - 273.15);
}

// парсинг данных
const temperature_max = temperatureInCelcius(weatherData.temp_max);
const temperature_min = temperatureInCelcius(weatherData.temp_min);
const temperature = temperatureInCelcius(weatherData.temp);
const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
const visibilityInMeters = weatherData.visibility;

const humidity = weatherData.humidity;
  let humidityIcon;
  if (humidity < 30) {
    humidityIcon = faTint;
  } else if (humidity < 60) {
    humidityIcon = faSmog;
  } else {
    humidityIcon = faCloudShowersHeavy;
  }

const pressure = weatherData.pressure;
  let pressureIcon;
  if (pressure < 1000) {
    pressureIcon = faExclamationTriangle;
  } else if (pressure > 1020) {
    pressureIcon = faArrowDown;
  } else {
    pressureIcon = faTachometerAlt;
  }

  // change bar color according to temperature
  let barTemperatureclassName;
  if (temperature >= 15) {
    barTemperatureclassName = "wr-day-carousel__item highup";
  } else if (temperature >= 5 && temperature < 15) {
    barTemperatureclassName = "wr-day-carousel__item high";
  } else if (temperature >= 0 && temperature < 5) {
    barTemperatureclassName = "wr-day-carousel__item highlow";
  } else if (temperature >= -5 && temperature < 0) {
    barTemperatureclassName = "wr-day-carousel__item zero";
  } else if (temperature >= -10 && temperature < -5) {
    barTemperatureclassName = "wr-day-carousel__item low";
  } else if (temperature < -10) {
    barTemperatureclassName = "wr-day-carousel__item lowup";
  }

    return (  
            <div className={barTemperatureclassName} >
                <div className="wr-day__content">
                    <div className="wr-day__title">
                        <div className="wr-date">
                            <span className="wr-date__longish">
                                Today
                            </span>
                        </div>
                    </div>
                    <div className="wr-day__body">
                        <div className="wr-day__details-container">
                            <div className="wr-day__details">
                                <div className="wr-day__weather-type">
                                    <div className="wr-weather-type--day">
                                        <div className="wr-weather-type__text">
                                        {weatherData.description}
                                        </div>
                                        <div className="wr-weather-type__icon">
                                            <div className="img-wrapper">
                                                <img id="weather-icon" src={iconUrl} alt="Weather Icon"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wr-day__temperature">
                                        <div className="wr-day-temperature__high">
                                            <span className="wr-day-temperature__high-value">
                                            {temperature_max}°C
                                                </span>
                                        </div>
                                        <div className="wr-day-temperature__low">
                                            <span className="wr-day-temperature__low-value">
                                            {temperature_min}°C
                                            </span>
                                        </div>
                                </div>
                                <div className="wr-wind-speed">
                                    <div className="wr-wind-type__icon">
                                      <svg className="icon-weather" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32" alt="wind" >
                                      <title>wind</title>
                                        <path d="M26.938 12c-1.656 0-3 1.344-3 3 0 0.353 0.073 0.685 0.184 1h-19.184c-0.552 0-1 0.448-1 1s0.448 1 1 1h22c1.656 0 3-1.344 3-3s-1.344-3-3-3zM4.938 14h12c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3c0 0.353 0.073 0.685 0.184 1h-9.184c-0.552 0-1 0.448-1 1s0.448 1 1 1zM20.938 20c-0.059 0-0.115 0.013-0.174 0.018-0.039-0.003-0.072-0.018-0.111-0.018h-15.428c-0.711 0-1.287 0.448-1.287 1s0.576 1 1.287 1h12.897c-0.111 0.315-0.184 0.648-0.184 1 0 1.656 1.344 3 3 3s3-1.344 3-3-1.344-3-3-3z"></path>
                                      </svg>
                                    </div>
                                        <div className="wr-wind-speed__description">
                                            <span className="wr-wind-speed__value ">
                                                {weatherData.windSpeed} mph
                                            </span>
                                        </div>
                                </div>
                            </div>
                            <div className="wr-day__details">

                                <div className="wr-humidity">
                                    <div className="wr-humidity__icon">
                                    <FontAwesomeIcon className="icon-weather" icon={humidityIcon} />
                                    </div>
                                        <div className="wr-humidity__description">
                                            <span className="wr-humidity__value ">
                                            {humidity} %
                                            </span>
                                        </div>
                                </div>
                                <div className="wr-pressure">
                                    <div className="wr-pressure__icon">
                                    <FontAwesomeIcon className="icon-weather" icon={pressureIcon} />
                                    </div>
                                        <div className="wr-pressure__description">
                                            <span className="wr-pressure__value ">
                                            {pressure} hPa
                                            </span>
                                        </div>
                                </div>
                                <div className="wr-visibility">
                                    <div className="wr-visibility__icon">
                                        <FontAwesomeIcon className="icon-weather" icon={faEye} />
                                    </div>
                                    <div className="wr-visibility__description">
                                        <span className="wr-visibility__value ">
                                            {visibilityInMeters} m
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
