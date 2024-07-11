// import axios from "axios";
import { useSyncExternalStore } from 'react';
import { weatherStore  } from '../../store/weather.js';
import { weatherDailyStore } from '../../store/weatherDaily.js';
import { useState, useEffect } from 'react';
import React from "react";
import Slider from "react-slick";

export default function HourlyWeatherItem(){
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

const settings = {
      dots: false,
      infinite: true,
      speed: 700,
      slidesToShow: 10,
      slidesToScroll: 8,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 1
          }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

const forecastList = weatherStoreDaily.map((item, index) => {
    const temperature_max = temperatureInCelcius(item.main?.temp_max);
    const temperature_min = temperatureInCelcius(item.main?.temp_min);
    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`;
    const dateTimeMillis = (item.dt + weatherData.timezone) * 1000;
    const temperature = temperatureInCelcius(item.main?.temp);
    const formattedDate = new Date(dateTimeMillis);
    const currentDate =   getOrdinalSuffix(formattedDate.getUTCDate());
    const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(formattedDate);
    const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(formattedDate);
// change bar color according to temperature
let barTemperatureclassName = 'wr-day-carousel__item';
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

    return(
    <div className={barTemperatureclassName} key={index} >
        <div
            className="wr-day__content">
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
                        {item.dt_txt}
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
                </div>
            </div>
        </div>        
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

