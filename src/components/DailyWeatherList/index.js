import React from "react";
import { useSyncExternalStore } from 'react';
import { useState, useEffect } from 'react';
import { weatherStore  } from '../../store/weather.js';
import { weatherDailyStore  } from '../../store/weatherDaily.js';
import { Container } from "@mui/material";
import DailyWeatherItem from "../DailyWeatherItem";
import CurrentWeatherItem from "../CurrentWeatherItem/index.js";
import HourlyWeatherItem from "../HourlyWeatherItem/index.js";



export default function DailyWeatherList(){
    const divCurrent = document.getElementById('current');
    const divDaily = document.getElementById('daily');
    const divHourly = document.getElementById('hourly');
    const btnCurrent = document.getElementById('btn-current');
    const btnDaily = document.getElementById('btn-daily');
    const btnHourly = document.getElementById('btn-hourly');
    
    const weatherStoreCurrent = useSyncExternalStore(weatherStore.subscribe, weatherStore.getSnapshot);
    const weatherStoreDaily = useSyncExternalStore(weatherDailyStore.subscribe, weatherDailyStore.getSnapshot);

    const [containerClassName, setContainerClassName] = useState('wr-day-container');
    const [timeOfDay, setTimeOfDay] = useState('day');

    const [currentLocation, setCurrentLocation] = useState({
            currentCity: '',
            country: '',
            timezone: 7200,
            sunrise: null,
            sunset: null,
            dtValue: null
        });


//  текущее время с учeтом зоны 
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

const currentTimestamp = Date.now();
const timezoneOffset = currentLocation.timezone;
const formattedDate = new Date((currentTimestamp + timezoneOffset*1000));

const currentDate =   getOrdinalSuffix(formattedDate.getUTCDate());
const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(formattedDate);
const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(formattedDate);

const currentHours = formattedDate.getUTCHours();
const currentMinutes = formattedDate.getUTCMinutes();
const formattedCurrentTime = `${currentHours < 10 ? '0' : ''}${currentHours}:${currentMinutes < 10 ? '0' : ''}${currentMinutes}`;

// восход и закат
const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    const utc = date.getTime() + date.getTimezoneOffset() * 60000; 
    const localTime = new Date(utc + currentLocation.timezone * 1000); 
    const hours = localTime.getHours().toString().padStart(2, '0');
    const minutes = localTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };


// класс для бекграунда секции
    useEffect(() => {
        setTimeOfDay(timeOfDay);
        setContainerClassName(containerClassName);
      }, [containerClassName, timeOfDay]);

      useEffect(() => {
        setCurrentLocation(currentLocation);
      }, [currentLocation]);

// reset btn classes for click
const reset = () => {
        divCurrent && divCurrent.classList.remove('d-none');
        divDaily && divDaily.classList.remove('d-none');
        divHourly && divHourly.classList.remove('d-none');
        btnCurrent && btnCurrent.classList.remove('active');
        btnDaily && btnDaily.classList.remove('active');
        btnHourly && btnHourly.classList.remove('active');
        btnCurrent && btnCurrent.classList.remove('current');
        btnDaily && btnDaily.classList.remove('current');
        btnHourly && btnHourly.classList.remove('current');
}

//   click on the button
    const onClickCurrentHandler = (e) => {
        e.preventDefault();
        reset();

        divDaily && divDaily.classList.add('d-none');
        divHourly && divHourly.classList.add('d-none');

        btnCurrent && btnCurrent.classList.add('current');
        btnDaily && btnDaily.classList.add('active');
        btnHourly && btnHourly.classList.add('active');
    };

    const onClickDailyHandler = (e) => {
        e.preventDefault();
        reset();
        divCurrent && divCurrent.classList.add('d-none');
        divHourly && divHourly.classList.add('d-none');

        btnCurrent && btnCurrent.classList.add('active');
        btnDaily && btnDaily.classList.add('current');
        btnHourly && btnHourly.classList.add('active');
    }

    const onClickHourlyHandler = (e) => {
        e.preventDefault();
        reset();
        divCurrent && divCurrent.classList.add('d-none');
        divDaily && divDaily.classList.add('d-none');

        btnCurrent && btnCurrent.classList.add('active');
        btnDaily && btnDaily.classList.add('active');
        btnHourly && btnHourly.classList.add('current');
  }




    return(
        <div className="wr-forecast" id="wr-forecast" lang="en">
            <div className={`${containerClassName} ${timeOfDay}`}>
                     
            <Container className="local-forecast">
                <div className="wr-location"> 
                    <div className="location-title-wrapper">
                        <div id="wr-location-name-id" className="wr-location__name">
                        {currentLocation.currentCity} {currentLocation.country} 
                        </div> 
                        <div className='date'>{`${currentDay}  ${currentDate} ${currentMonth} ${formattedCurrentTime}`}
                        </div>
                        <div className="wr-sunrise">
                            <div className="wr-weather-type__icon">
                            <svg className="icon-weather" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 32">
                                    <title>weather</title>
                                    <path d="M16 5.938c0.552 0 1-0.448 1-1v-2c0-0.552-0.448-1-1-1s-1 0.448-1 1v2c0 0.552 0.448 1 1 1zM23.777 8.573l1.414-1.414c0.391-0.391 0.391-1.023 0-1.414s-1.023-0.391-1.414 0l-1.414 1.414c-0.391 0.391-0.391 1.023 0 1.414s1.023 0.391 1.414 0zM4 15.938h2c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2c-0.552 0-1 0.448-1 1s0.448 1 1 1zM25 14.938c0 0.552 0.448 1 1 1h2c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2c-0.552 0-1 0.448-1 1zM8.221 8.573c0.391 0.391 1.024 0.391 1.414 0s0.391-1.023 0-1.414l-1.414-1.414c-0.391-0.391-1.023-0.391-1.414 0s-0.391 1.023 0 1.414l1.414 1.414zM9.102 15.938h2c-0.066-0.323-0.102-0.658-0.102-1 0-2.762 2.238-5 5-5s5 2.238 5 5c0 0.342-0.035 0.677-0.102 1h2c0.049-0.329 0.102-0.658 0.102-1 0-3.859-3.141-7-7-7s-7 3.141-7 7c0 0.342 0.055 0.671 0.102 1zM28 17.938h-24c-0.552 0-1 0.448-1 1s0.448 1 1 1h24c0.552 0 1-0.448 1-1s-0.448-1-1-1zM28 21.938h-24c-0.552 0-1 0.448-1 1s0.448 1 1 1h24c0.552 0 1-0.448 1-1s-0.448-1-1-1zM28 25.938h-24c-0.552 0-1 0.448-1 1s0.448 1 1 1h24c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
                            </svg>
                        </div>
                            <div className="wr-sunrise__description">
                                <div className="wr-sunrise__value ">
                                Sunrise: {currentLocation.sunrise ? formatTime(currentLocation.sunrise) : " "}
                                </div>
                                <div className="wr-sunset__value ">
                                Sunset: {currentLocation.sunset ? formatTime(currentLocation.sunset) : " "}
                                </div>
                            </div>
                        </div>
                    </div>
                    { Object.keys(weatherStoreCurrent).length > 0 ? 
                    <div className="btn-wrapper">
                            <button type='button' className="wr-location__overview current" id="btn-current" onClick={onClickCurrentHandler}>
                                current  
                            </button> 
                            <button type='button' className="wr-location__overview active" id="btn-daily" onClick={onClickDailyHandler}>
                            5-days  
                            </button>
                            <button type='button' className="wr-location__overview active" id="btn-hourly" onClick={onClickHourlyHandler}>
                            hourly  
                            </button> 
                    </div>
                    : 
                    <p></p>} 
                </div>

            { Object.keys(weatherStoreCurrent).length > 0 ? 
            <div className="current-forecast" id="current"> 
            <CurrentWeatherItem  setTimeOfDayLocal={setTimeOfDay} setContainerClassNameLocal={setContainerClassName} setCurrentLocationLocal={setCurrentLocation}/> 
            </div> : <p></p>}   
             

            { (weatherStoreDaily).length > 0 ? <div className="daily-forecast d-none" id="daily"><DailyWeatherItem /></div> : <p></p> }

            { (weatherStoreDaily).length > 0 ? <div className="daily-forecast d-none" id="hourly"><HourlyWeatherItem /></div> : <p></p> }

            </Container>
          </div>
         </div>
    )
}