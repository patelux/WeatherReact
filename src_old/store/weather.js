let currentWeather = {};
let listeners = [];
let totalResults = 0;

export const weatherStore = {
    setTotalResults(val) {
        totalResults = val;
        emitChange();
    },
    addCurrentWeather(currentWeatherObj) {
        currentWeather = {...currentWeather,...currentWeatherObj};
        emitChange();
    },
    resetStore() {
        currentWeather = {};
        emitChange();
    },
    subscribe(listener) {
        listeners = [...listeners, listener];

        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    },
    getSnapshot() {
        return currentWeather;
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