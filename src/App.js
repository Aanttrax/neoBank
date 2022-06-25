import React, { useState } from "react";
import './App.css';

function App() {

  const [daysExpenditures, setDaysExpenditures]=useState(1);
  const [daysTrailing, setDaysTrailing]=useState(1);
  const [notify,setNotify]=useState();
  const [error, setError]=useState(false);

  function expenditures(e){
    if(e.target.value < 1){
      setError(true)
    }else{
      setDaysExpenditures(e.target.value);
      setError(false)
    }
    
  }
  function days(e){
    if(e.target.value < 1 || e.target.value >=daysExpenditures){
      setError(true)
    }else{
      setDaysTrailing(e.target.value);
      setError(false);
    }
  }
  function verify(e){
    if(e.target.value < 0 || e.target.value >200){
      setError(true)
    }else{
      setError(false)
    }
  }

  let numbers = [];

  for (let i = 0; i<daysExpenditures; i++){
    numbers.push(<input onChange={verify}id = {`days_${i}`} type='number' key={i} min ="0" max='200'/>)
  }

  function play(e){
    e.preventDefault();
    let expenditures_num = [];
    let notice =0;
    
    for(let i =0;i<numbers.length;i++){
      expenditures_num.push(parseInt(document.getElementById(`days_${i}`).value,10))
    }

    let aux = 0;
    for(let i=0;i<expenditures_num.length-daysTrailing;i++){
      i=parseInt(daysTrailing)+i;
      let average = 0;  
      let k =0;
      
      for(let j=0;j<daysTrailing;j++){
        
        k=k+aux
        average = average + expenditures_num[k];
        k++;
        k=k-aux;
        console.log(k,'k')
      }
      
      if(expenditures_num[i]>= (2*average/daysTrailing)){
        notice++

      }
      i=i-parseInt(daysTrailing);
      aux++;
      setNotify(notice)
    }
  }
  return (
    <div className="body">
      <h1>Acount Activity</h1>
      <label htmlFor="expenditures">Number of Days of Transaction:</label>
      <input onChange={expenditures} type='number' id="expenditures" min ="1" max="200000"/>
      <label htmlFor="days">Number of Trailing Days:</label>
      <input onChange={days} type='number' id='days' min='1'/>
      <form className='form' onSubmit={play}>
        <div>
          {numbers}
        </div>
        {error?<p className="error">Wrong number</p>:''}
        <button className="btn">Play</button>
      </form>
      <div>
      {notify?<p className="result">Number of notification: {notify}</p>:''}
      </div>
    </div>
  );
}

export default App;
