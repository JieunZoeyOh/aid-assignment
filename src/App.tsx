import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button type="button" onClick={() => setCount(count + 1)}>
        click
      </button>
      <div className="text-3xl font-bold underline">count: {count}</div>
    </>
  );
}

export default App;
