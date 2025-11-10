import { useState, useEffect } from 'react'

function App() {
 return <div>
  This is a counter
 </div>
}

function Counter(){
  const[count, setCount] = useState(0);
  return (

    

    <div>
    <h1>{count}</h1>
    <button onClick={ () => setCount(count+1) }>Increase Count</button>
    <button onClick={ () => setCount(count-1) }>Decrease Count</button>
    <button onClick={ () => setCount(0) }>Reset</button>
    </div>
  )
  
}

export default App