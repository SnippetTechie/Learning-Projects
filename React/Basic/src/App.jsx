import { useState, useEffect } from "react";

function App() {
  return (
    <div>
      <Counter></Counter>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  console.log("Inside the counter component");

  useEffect(() => {
    setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    console.log("Inside UseEffect 'Mounted' ");
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

export default App;
