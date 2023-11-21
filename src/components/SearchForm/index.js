import axios from "axios";
import {
    Grid,
    Button,
    Container,
    TextField,
    InputAdornment
} from "@mui/material";
import { useEffect, useRef, useState } from 'react';
// import { useSyncExternalStore } from 'react';
import { weatherStore } from '../../store/weather.js';
import { weatherDailyStore } from '../../store/weatherDaily.js';
import SearchIcon from '@mui/icons-material/Search';


const MY_API_KEY = '5be78af818ee7dcfc981e54df16594ea';
const API_URL = `https:/api.openweathermap.org/data/2.5/weather`;
const MY_API_KEY_DAILY = '6937530a137795579f942882f64a8f1a';
const API_URL_DAILY = `https:/api.openweathermap.org/data/2.5/forecast`;

export default function SearchForm () {
    const inputRef = useRef(null);
    const [searchVal, setSearchVal] = useState('');
    const [inputValError, setInputValError] = useState('');
    const [currentLon, setCurrentLon] = useState(null);
    const [currentLat, setCurrentLat] = useState(null);
    
    // 123456789
    // const weatherStoreCurrent = useSyncExternalStore(weatherStore.subscribe, weatherStore.getSnapshot);
    
    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length !== 0 && !/^[A-Za-z]+$/.test(inputValue) ){
            setInputValError('Only letters are allowed!');
        }
        else if (inputValue.length < 3){
            setInputValError('Minimum length is 3');
        }
          else {
            setSearchVal(inputValue);
            setInputValError('');    
        }
      };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (searchVal.trim() === '') {
            setInputValError('Please input city name!');
            return;
          }
        if (searchVal.length >= 3) {
            getResults();


        } else {
          setInputValError('Please input right city name!');
        }
       
    }
      useEffect(()=>{
        if(currentLon && currentLat){
        getDailyResults(currentLon, currentLat);
        }
      }, [currentLon, currentLat]);

    const getResults = () => {
        try {
          const response = axios.get(`${API_URL}?appid=${MY_API_KEY}&q=${searchVal}`);
          if (response.status === 200) {
            weatherStore.addCurrentWeather(response.data);
            setCurrentLon(response.data.coord.lon);
            setCurrentLat(response.data.coord.lat);
          } 
          weatherStore.addCurrentWeather({});
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setInputValError('City not found! Try again...')
          } else {
            setInputValError(`Something went wrong, try again later..`)
          }
        }
      };
      // DAILY FETCH
    const getDailyResults = (lon, lat) => {
      try {
        const response = axios.get(`${API_URL_DAILY}?appid=${MY_API_KEY_DAILY}&lat=${lat}&lon=${lon}`);
        if (response.status === 200) {
          weatherDailyStore.resetStore();
          weatherDailyStore.addDailyWeather(response.data.list);
        } 
          weatherDailyStore.addDailyWeather([]);
      } catch (error) {
        console.error(error.message)
        }
      }

    return (
        <div className="search">
            <Container>
                <form onSubmit={onSubmitHandler}>
                <Grid container spacing={{ xs: 2, md: 3 }} mt={{ xs: 0, md: 0}}  className="search-list">
                            <Grid item sx={{display: { xs: 'none', sm: 'inline-block' }}} className="search-item" >
                            <p className="search-title">weather</p>
                            </Grid>
                            <Grid item xs={11} sm={8} className="search-item" id="input-wrapper">
                                <TextField
                                    className="search-input"
                                     ref={inputRef}
                                    id="outlined-basic" 
                                    placeholder="Enter a city"
                                    fullWidth
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment className="search-btn-wrapper" position="end">
                                                <Button className="search-btn" type='submit' variant="contained" endIcon={<SearchIcon className="search-btn-icon"/>}>    
                                                </Button>       
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <span className='error' role="alert">{inputValError}</span>
                </form>
            </Container>
        </div>

    )
}