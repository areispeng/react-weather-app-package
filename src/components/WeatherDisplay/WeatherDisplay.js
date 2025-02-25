import { memo } from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = memo(({ weather }) => {
    if (!weather) return null;

    const getWeatherIcon = (iconCode) => {
        try {
            return require(`../../assets/images/weather-icon/${iconCode}.png`);
        } catch (error) {
            console.error('Weather icon not found:', error);
            return null;
        }
    };

    const iconUrl = getWeatherIcon(weather.weather[0].icon) || require(`../../assets/images/weather-icon/01d.png`);
    const time = new Date().toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    return (
        <div className="weather-card">
            <div className="weather-main">
                <div className="weather-header">
                    <h2>Today's Weather</h2>
                </div>
                <div className="temperature-large">
                    {Math.round(weather.main.temp)}°
                </div>
                <div className="temp-range">
                    H: {Math.round(weather.main.temp_max)}° L: {Math.round(weather.main.temp_min)}°
                </div>
                <div className="detail-item">
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                </div>
            </div>
            <div className="weather-details">

                <div className="detail-item">
                    <div className="time">{time}</div>
                </div>
                <div className="detail-item">
                    <span>Humidity: {weather.main.humidity}%</span>
                </div>
                <div className="detail-item">
                    <span>{weather.weather[0].description}</span>
                </div>
            </div>

            <div className="weather-icon">
                {iconUrl && <img src={iconUrl} alt={weather.weather[0].description} />}
            </div>
        </div>
    );
});

export default WeatherDisplay; 