import { useState } from 'react'


function Button(props){
  return(
    <button onClick={props.eventhandler}>
      {props.text}
    </button>
  )
}

function Feedback(props){
  if(props.goodcpy==0 && props.neutralcpy==0 &&props.badcpy==0){
    return(
      <div>No Feedback given</div>
    )
  }
  else{
    return(
      <div>
        good:{props.goodcpy}<br/>
        neutral:{props.neutralcpy}<br/>
        bad:{props.badcpy}<br/>
        all:{props.goodcpy+props.badcpy+props.neutralcpy}<br/>
        average:{(props.goodcpy*1+props.badcpy*-1)/(props.goodcpy+props.badcpy+props.neutralcpy)}<br/>
        positive:{props.goodcpy/(props.goodcpy+props.badcpy+props.neutralcpy)*100}
      </div>
    )
      
    }
  
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button eventhandler={()=>(setGood(prevGood => prevGood + 1))} text="Good"></Button>
      <Button eventhandler={()=>(setNeutral(prevNeutral => prevNeutral + 1))} text="Neutral"></Button>
      <Button eventhandler={()=>(setBad(prevNeutral => prevNeutral + 1))} text="Bad"></Button>
      <h1>Statistics</h1>
      <Feedback goodcpy={good} badcpy={bad} neutralcpy={neutral}/>

    </div>
  )
}

export default App