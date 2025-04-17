import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [clicked, setClicked] = useState(false); // tracks if "Click Me" was clicked

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=1&limit=20`);
      const result = await response.json();
      setData(result.results);
      setOffset(20); // next fetch should start from 20
      setClicked(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    if (!clicked) return; // only allow after first fetch

    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);
      const result = await response.json();
      setData((prevData) => [...prevData, ...result.results]);
      setOffset(offset + 10);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Pokemons</h1>

      <button onClick={fetchInitialData}>Click Me</button>
      <button onClick={fetchMoreData}>More</button>

      {loading && <p>Loading...</p>}

      <ul>
        {data.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;