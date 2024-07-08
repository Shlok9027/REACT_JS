import { useState  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  useState(15)   

  let [counter, setCounter] = useState(15) 

//  let counter = 15

  const addValue = () => {
    counter = counter + 1; 
    setCounter(counter)
    console.log("clicked", counter);
  }

  const removeValue = () => {
    counter = counter - 1;
    setCounter(counter)
    //setCounter(counter - 1)
  }

  return (
    <>
     <h1>React Project</h1>
     <h3>counter value : {counter}</h3>

     <button onClick={addValue}>Add value</button>
     <br />
     <button onClick={removeValue}>remove value {counter}</button>
     <p>footer: {counter}</p>

    </>
  )
}

export default App
