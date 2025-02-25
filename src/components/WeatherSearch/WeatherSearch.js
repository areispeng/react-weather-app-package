import React, { useState } from 'react';
import './WeatherSearch.css';
import { ReactComponent as Mainsearch } from "../../assets/images/menu-icon/Mainsearch.svg";

const WeatherSearch = ({ onSearch, loading }) => {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        const newErrors = {};
        if (!city.trim()) {
            newErrors.city = 'Please enter city name';
        }
        if (!country.trim()) {
            newErrors.country = 'Please enter country code';
        } else if (country.trim().length !== 2) {
            newErrors.country = 'Please enter a valid 2-letter country code';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            const searchQuery = `${city.trim()},${country.trim()}`;
            onSearch(searchQuery);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <div className="search-box">
                    <div className="input-group">
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => {
                                setCountry(e.target.value.toUpperCase());
                                setErrors({ ...errors, country: '' });
                            }}
                            placeholder="Country"
                            disabled={loading}
                            maxLength={2}
                            className={`country-input ${errors.country ? 'error' : ''}`}
                        />
                        <div className="input-divider"></div>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value);
                                setErrors({ ...errors, city: '' });
                            }}
                            placeholder="City"
                            disabled={loading}
                            className={`city-input ${errors.city ? 'error' : ''}`}
                        />

                    </div>
                    <button type="submit" disabled={loading}>
                        <Mainsearch />
                    </button>
                </div>
                {(errors.city || errors.country) && (
                    <div className="error-message">
                        {errors.city || errors.country}
                    </div>
                )}
            </form>
        </div>
    );
};

export default WeatherSearch; 