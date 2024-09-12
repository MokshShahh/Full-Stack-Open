import { useState, useEffect } from "react";
import axios from "axios";


const App =()=>{
  const [countries,setcountries]=useState([])
  const [searchItem,setsearchItem]=useState('')
  const [weather,setweather]=useState(null)
  


  useEffect(()=>{
    if(searchItem.trim()===''){
      setcountries([])
      return;
    }
    
      try{
        const url=`https://restcountries.com/v3.1/name/${searchItem}`
        axios
        .get(url)
        .then(Response =>{
          
          setcountries(Response.data)
          if(Response.data.length===1){
            const capital=Response.data[0].capital
            fetchWeather(capital)
          }
        })

      }
      catch(error){
        console.log("error in data fetching")

      }
    
  },[searchItem])

  const fetchWeather=(capital)=>{
    try {
      const apiKey=import.meta.env.VITE_SOME_KEY
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
                                .then(response=>{
                                  setweather(response.data)
                                  
                                  console.log(response.data)
                                })
      
    } catch (error) {
      console.log("error in fething weather data")
      setweather(null)
      
    }
  }

  const renderLanguages=(language)=>{
    if(Array.isArray(language)){
      return language.join(', ')
    }
    else if(typeof language === "object"){
      return Object.values(language).join(', ')
    }
    else{
      return "unknown"
    }


  }


  return(
    <>
    <h1>Countries</h1>
    <form>
      <label>Enter country name </label>
      <input type="text" value={searchItem} onChange={(e)=>setsearchItem(e.target.value)}></input>
    </form>
    {countries.length>10&&(<p>too many countries</p>)}
    {countries.length<=10&&countries.length>1&&(
      <ul>
        
        {countries.map(country=>(
      <li key={country.name.common}>{country.name.common} 
      <button onClick={()=>{
        setsearchItem(country.name.common)
        
        setcountries([country])
        

      }}>SHOW</button></li>)
    
    )

  }</ul>)}

  {countries.length===1&&(
    <div>
      <h3>
      {countries[0].name.common}
      </h3>
      <p>
        Capital: {countries[0].capital}<br></br>
        Area: {countries[0].area}
      </p>
      <p>
        languages:  {countries[0].languages && renderLanguages(countries[0].languages)}
      </p>
      <div>
        FLAG:
        
      </div><br/>
      <img alt="country flag" src={countries[0].flags.png}/>
      <h3>CURRENT WEATHER at {countries[0].capital} </h3>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon"></img>
      <p>TEMP: {weather.main.temp} C</p>
      <p>HUMIDITY {weather.main.humidity} </p>
      <p>WIND SPEED {weather.wind.speed} </p>
      
        
    </div>
  )}
    </>
  )



}



export default App