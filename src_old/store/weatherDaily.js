let dailyWeather = [];
let listeners = [];
let totalResults = 0;

export const weatherDailyStore = {
    setTotalResults(val) {
        totalResults = val;
        emitChange();
    },
    addDailyWeather(dailyWeatherArr) {
        dailyWeather = [...dailyWeather,...dailyWeatherArr];
        emitChange();
    },
    resetStore() {
        dailyWeather = [];
        emitChange();
    },
    subscribe(listener) {
        listeners = [...listeners, listener];

        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    },
    getSnapshot() {
        return dailyWeather;
    },
    getResults() {
        return totalResults;
    }
}

function emitChange() {
    for (let listener of listeners) {
        listener();
    }
}