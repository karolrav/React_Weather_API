import './App.css';
import React, {useState} from 'react'

const api = {
  key: "c644efb3e9b2c561b64f41ab9e617328",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&unit=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)
    });
  }
}
  
  const datebuilder = (d) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

return `${day} ${date} ${month} ${year}`
  }
  
  return (
    <div className="app">
    <main>
      <div className="search-box">
        <input type="text"
        className="search-bar"
        placeholder='iveskite valstybe...'
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
        <div>
      <div className='location-box'>
        <div className='location'>{weather.name}, {weather.sys.country}</div>
        <div className='date'>{datebuilder(new Date())}</div>
      </div>
      <div className='weather-box'>
        <div className='temp'>
        {Math.round(weather.main.temp-272.15)}°c
        </div>
        <div className='weather'>{weather.weather[0].main}</div>
      </div>
      </div>
      ) : ('')}
    </main>
    </div>
  );
}

export default App;
