import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const result = await response.json();
      setData(result.results);
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'loading' : 'click  me '}
      </button>

      {data && (
        <ul >
          {data.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;