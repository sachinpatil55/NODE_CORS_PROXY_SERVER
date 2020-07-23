import React, { useState, useEffect } from 'react';

function useApi(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:4000/randomSearchApi?name=${query}`,{
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
          }
        );
        const json = await response.json();
        console.log(json);
        setResults(json.body.data );
        setError(false)
      } catch(err) {
        setError(true);
        setResults([]);
       }finally {
        setLoading(false);
      }
    }

    if (query !== '') {
      fetchData();
    }
  }, [query]);

  return [results, loading, hasError];
}

export default function SearchAPI() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, loading, hasError] = useApi(query);
 
  return (
    <div>
      <h1>CORS PROXY SERVER</h1>
      <h4  style={{paddingLeft:"80px"}}>(NODE Express React )</h4>
      <form
        onSubmit={e => {
          e.preventDefault();
          setQuery(search);
        }}
        style={{paddingLeft:"50px"}}
      >
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="search CORS Api !"
        />
        <button type="submit">Search</button>
      </form>
      <br />
      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        <pre>
        <code>
          {results.length ? JSON.stringify(
            results,
            null,
            2
          ) : null}
        </code>
      </pre>
      )}
      {hasError && <h2 style={{paddingLeft:"80px",color:'red'}}>Invalid URL </h2>}
    </div>
  );
}
