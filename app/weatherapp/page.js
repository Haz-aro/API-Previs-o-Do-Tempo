// app/weatherapp/page.js

"use client";
import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../../lib/weather';

import './WeatherPage.css';

export default function WeatherPage() {
  const [city, setCity] = useState(''); 
  const [weatherData, setWeatherData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [backgroundStyle, setBackgroundStyle] = useState({}); 

  useEffect(() => {
    if (weatherData) {
      const temp = weatherData.main.temp;
      let bgGradient, textColor;

      if (temp < 0) {
        bgGradient = 'linear-gradient(to right, #000428, #004e92)'; 
        textColor = '#ffffff';
      } else if (temp >= 0 && temp < 10) {
        bgGradient = 'linear-gradient(to right, #1c92d2, #f2fcfe)'; 
        textColor = '#ffffff';
      } else if (temp >= 10 && temp < 20) {
        bgGradient = 'linear-gradient(to right, #3a7bd5, #3a6073)'; 
        textColor = '#ffffff';
      } else if (temp >= 20 && temp < 30) {
        bgGradient = 'linear-gradient(to right, #f7971e, #ffd200)'; 
        textColor = '#000000';
      } else if (temp >= 30 && temp < 40) {
        bgGradient = 'linear-gradient(to right, #ff512f, #dd2476)'; 
        textColor = '#ffffff';
      } else {
        bgGradient = 'linear-gradient(to right, #FF4E50, #F9D423)'; 
        textColor = '#000000';
      }

      setBackgroundStyle({
        background: bgGradient,
        color: textColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background 0.5s ease-in-out, color 0.5s ease-in-out',
      });
    }
  }, [weatherData]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city); 
      setWeatherData(data);
    } catch (err) {
      setError('Erro ao buscar dados do clima. Verifique a cidade e tente novamente.');
    }
    setLoading(false); 
  };

  return (
    <div style={backgroundStyle} className="weather-container"> {/* Estilo de fundo inline */}
      <div className="content-wrapper">
        <h1>Busque a previsão do tempo</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Digite o nome da cidade"
          className="input-city"
        />
        <button onClick={handleSearch} className="search-button">Buscar</button>

        {loading && <p className="loading">Carregando...</p>}
        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <h2>Previsão do tempo para {weatherData.name}</h2>
            <p>Temperatura: {weatherData.main.temp}°C</p>
            <p>Condição: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
