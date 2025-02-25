import { useState, useEffect } from 'react';
import WeatherSearch from './components/WeatherSearch/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import SearchHistory from './components/SearchHistory/SearchHistory';
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';
import { weatherAPI } from './services/api';
import bgLight from './assets/images/bg-images/bg-light.png';
import bgDark from './assets/images/bg-images/bg-dark.png';
import './App.css';

function App() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [responseError, setResponseError] = useState(null);
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const saved = localStorage.getItem('weatherAppTheme');
        return saved ? saved === 'dark' : false;
    });
    const [searchHistory, setSearchHistory] = useState(() => {
        const saved = localStorage.getItem('weatherSearchHistory');
        return saved ? JSON.parse(saved) : [];
    });

    // save theme
    useEffect(() => {
        localStorage.setItem('weatherAppTheme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    // save search history
    useEffect(() => {
        localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
    }, [searchHistory]);

    const handleThemeToggle = () => {
        setIsDarkTheme(prev => !prev);
    };

    const handleSearch = async (location) => {
        setLoading(true);
        setResponseError(null);
        try {
            const response = await weatherAPI.getCurrentWeather(location);
            setWeather(response.data);

            // add search record
            const searchTime = new Date().toISOString();
            setSearchHistory(prev => {
                const newHistory = [{
                    id: searchTime,
                    location,
                    time: searchTime,
                    temp: response.data.main.temp
                }, ...prev].slice(0, 5);
                return newHistory;
            });
        } catch (error) {
            console.error('Search error:', error);
            const errorMessage = getErrorMessage(error);
            setResponseError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getErrorMessage = (error) => {
        if (!error.response) {
            return 'Network error. Please check your internet connection.';
        }

        const statusCode = error.response.status;
        const errorMessages = {
            404: 'City not found. Please check the city name and country code.',
            401: 'Invalid API key. Please contact support.',
            429: 'Too many requests. Please try again later.',
            500: 'Server error. Please try again later.',
        };

        return errorMessages[statusCode] || 'An unexpected error occurred. Please try again.';
    };

    const handleDeleteHistory = (id) => {
        setSearchHistory(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div
            className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}
            style={{
                '--bg-light': `url(${bgLight})`,
                '--bg-dark': `url(${bgDark})`
            }}
        >
            <ThemeSwitch isDark={isDarkTheme} onToggle={handleThemeToggle} />
            <div className="wrapper">
                <div className="container">
                    <div className="search-container-wrapper">
                        <WeatherSearch onSearch={handleSearch} loading={loading} />
                    </div>
                    <div className="weather-wrapper">
                        {loading ? (
                            <div className="loading">Loading...</div>
                        ) : (
                            responseError ? (
                                <div className="error-container">
                                    <h2>Something went wrong:</h2>
                                    <pre>{responseError}</pre>
                                </div>
                            ) : (
                                <>
                                    <WeatherDisplay weather={weather} />
                                    <SearchHistory
                                        history={searchHistory}
                                        onSearch={handleSearch}
                                        onDelete={handleDeleteHistory}
                                    />
                                </>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App; 