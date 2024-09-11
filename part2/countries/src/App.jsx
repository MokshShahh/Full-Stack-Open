import { useState, useEffect } from "react";
import axios from "axios";


const App =()=>{
  const [countries,setcountries]=useState([])
  const [searchItem,setsearchItem]=useState('')
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
        })

      }
      catch(error){
        console.log("error in data fetching")

      }
    
  },[searchItem])

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
      <li key={country.name.common}>{country.name.common}</li>)
    
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
        
    </div>
  )}
    </>
  )



}



export default App