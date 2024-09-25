// weather.js
export async function fetchWeatherData(city) {
    const apiKey = '2b3fae75263f4ea261e767965761ef05'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Falha ao buscar dados do clima');
      }
  
      const weatherData = await res.json();
      return weatherData;
    } catch (error) {
      console.error('Erro ao buscar dados do clima:', error);
      return null;
    }
  }