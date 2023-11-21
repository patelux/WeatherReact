// import axios from "axios";
import { useSyncExternalStore } from 'react';
import { weatherStore  } from '../../store/weather.js';
import { weatherDailyStore } from '../../store/weatherDaily.js';
import { useState, useEffect } from 'react';
import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faSmog, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

export default function DailyWeatherItem(){
    const weatherStoreDaily = useSyncExternalStore(weatherDailyStore.subscribe, weatherDailyStore.getSnapshot);
    const weatherStoreCurrent = useSyncExternalStore(weatherStore.subscribe, weatherStore.getSnapshot);
    const [weatherData, setWeatherData] = useState({
        currentCity: '',
        country: '',
        sunrise: null,
        sunset: null,
        timezone: null,
        lat: null,
        lon: null
      });

    const [isClicked, setIsClicked] = useState(false);

      useEffect(() => {
        if (weatherStoreCurrent) {
          setWeatherData({
            currentCity: weatherStoreCurrent.name || '',
            country: weatherStoreCurrent.sys?.country || '',
            sunrise: weatherStoreCurrent.sys?.sunrise || null,
            sunset: weatherStoreCurrent.sys?.sunset || null,
            timezone: weatherStoreCurrent.timezone || null,
            lat: weatherStoreCurrent.coord?.lon || null,
            lon: weatherStoreCurrent.coord?.lat || null
          });
        };
      }, [weatherStoreCurrent]);

// кельвін → цельсій
function temperatureInCelcius(temp) {
    return Math.round(temp - 273.15);
}
const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
};


const onClickLinkHandler = (e) => {
    e.preventDefault();
    if (!isClicked) {
        setIsClicked(true);
        e.currentTarget.parentElement.classList.add('active');
      } 
    if (isClicked) {
        setIsClicked(false);
        e.currentTarget.parentElement.classList.remove('active');
      }       
};
const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };
const everyFourthItem = weatherStoreDaily.filter((item, index) => index % 8 === 0);
const forecastList = everyFourthItem.map((item, index) => {
  // console.log(item);
    const temperature_max = temperatureInCelcius(item.main?.temp_max);
    const temperature_min = temperatureInCelcius(item.main?.temp_min);
    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`;
    const dateTimeMillis = (item.dt + weatherData.timezone) * 1000;
    const formattedDate = new Date(dateTimeMillis);
    const currentDate =   getOrdinalSuffix(formattedDate.getUTCDate());
    const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(formattedDate);
    const currentDayShort = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(formattedDate);
    const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(formattedDate);
// humidity + pressure
    const humidity = item.main?.humidity;
      let humidityIcon;
      if (humidity < 30) {
        humidityIcon = faTint;
      } else if (humidity < 60) {
        humidityIcon = faSmog;
      } else {
        humidityIcon = faCloudShowersHeavy;
      }

    const pressure = item.main?.pressure;
    const pressureIcon = faTachometerAlt;


    return(
    <div className="wr-day-carousel__item" key={index} >
        <a href='/'
            className="wr-day__content" onClick={onClickLinkHandler}>
            <div className="wr-day__title"
                aria-label="">
                <div className="wr-date">
                    <span className="wr-date__long">
                        {currentDay}&nbsp;
                        <span className="wr-date__light">
                            <span className="wr-date__long__dotm">
                               {currentDate}&nbsp;
                            </span>
                            <span className="wr-date__long__month">
                                {currentMonth}
                            </span>
                        </span>
                    </span>
                    <span className="wr-date__longish">
                        {currentDayShort}&nbsp;
                        <span className="wr-date__light">
                            <span className="wr-date__longish__dotm">
                                {currentDate}
                            </span>
                        </span>
                    </span>
                </div>
            </div>
            <div className="wr-day__body">
                <div className="wr-day__details-container">
                    <div className="wr-day__details">
                        <div className="wr-day__weather-type">
                            <div className="wr-weather-type--day">
                                <div className="wr-weather-type__text">
                            {item.weather[0]?.description}
                                </div>
                                <div className="wr-weather-type__icon">
                                    <div className="img-wrapper">
                                        <img id="weather-icon" src={iconUrl} alt="Weather Icon"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wr-day__temperature">
                            <div className="wr-day-temperature ">
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
                        </div>
                        <div className="wr-day__details__weather-type-description">
                        {item.weather[0]?.description}
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
                        </div>
                        <div className="wr-day__details">
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
                    </div>
                </div>
            </div>
        </a>        
    </div>
    )
})

    return(
    <div className="wr-day-carousel"> 
       <Slider {...settings}>
          {forecastList}
      </Slider>
    </div>
    )
}

