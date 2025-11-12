import { useState, useEffect } from "react";

function App() {
  const[ComponentVisibility, SetCountVisi] = useState(true);
  useEffect(()=>{
    setInterval(()=>{
      SetCountVisi( c=>!c);
    }, 3000)
  }, [])

  return <div>
    <h1>Heyyy</h1>
    {ComponentVisibility ? <Counter></Counter>: null}
    <b>Hope this is visible</b>
  </div>
}

function Counter() {
  const [count, setCount] = useState(0);

  console.log("COUNTER!");

  useEffect(() => {
    let clock = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    console.log("Inside UseEffect 'Mounted' ");

    return (() => {
      console.log("On unmount");
      clearInterval(clock);
    })
  }, []);


  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

export default App;
