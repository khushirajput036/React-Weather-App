import './App.css';
import { useState } from 'react';

function App() {
  let [city, setCity] = useState('');
  let [wDetails, setWdetails] = useState(null);  // Set initial state to null
  let getData = (event) => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=f52176eab94945d3871153935251203&q=${city}&aqi=yes`)
      .then((res) => res.json())
      .then((finalRes) => {
      
        if(finalRes.error) {
          setWdetails(null);  
        } else {
          setWdetails(finalRes);  
        }
      })
    event.preventDefault();
  }

  return (
    <div className="App">
      <div className='w-[100%] h-[100vh] bg-[#9abddc]'>
        <div className='max-w-[1320px] mx-auto'>
          <h1 className='text-[40px] font-bold py-[50px] text-white'>
            Weather App
          </h1>
          <form onSubmit={getData}>
            <input
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='w-[300px] h-[40px] pl-3'
              placeholder='City Name'
            />
            <button className='bg-[blue]'>Submit</button>
          </form>

          <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px]'id="degree">
            {wDetails !== null ? (
              <>
                <h3 className='font-bold text-[30px]'>
                  {wDetails.location.name} <span className='bg-[yellow]'>{wDetails.location.country}</span>
                </h3>
                <h2 className='font-bold text-[40px]'>
                  {wDetails.current.temp_c}°C
                </h2>
                <img
                  src={`https:${wDetails.current.condition.icon}`}
                  width={60}
                  alt='weather'
                />
                <p>{wDetails.current.condition.text}</p>
              </>
            ) : (
              "No city found"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
