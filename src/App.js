import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const firstHalf = data.slice(0, 10);
  const secondHalf = data.slice(10, 20);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const result = await response.json();
      setData(result.results);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "loading" : "Click  me "}
      </button>
      <button onClick={(  )=>{
        setMore(true)
      }} disabled={loading}>
        {loading ? 'loading' : 'More '}
      </button>

      {firstHalf && (
        <ul>
          {firstHalf.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
      {more && (
        <ul>
          {secondHalf.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
