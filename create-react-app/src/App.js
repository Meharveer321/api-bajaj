import React, { useState } from 'react';
import Select from 'react-select';

const App = () => {
  const [input] = useState('{"data": ["M","1","334","4","B"]}');
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filterOptions = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(input);
      const res = await fetch('http://localhost:3000/mwha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const getFilteredResponse = () => {
    if (!response || selectedFilters.length === 0) return '';
    return selectedFilters.map(filter => {
      if (response[filter.value]) {
        return `${filter.label}: ${response[filter.value].join(',')}`;
      }
      return '';
    }).filter(Boolean).join('\n');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Input</h1>
      <textarea
        value={input}
        readOnly
        style={{
          width: '100%',
          height: '50px',
          marginBottom: '10px',
          padding: '5px',
          resize: 'none'
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Submit
      </button>
      
      <h2>Multi Filter</h2>
      <Select
        isMulti
        options={filterOptions}
        onChange={setSelectedFilters}
        styles={{
          control: (base) => ({
            ...base,
            marginBottom: '20px'
          })
        }}
      />
      
      <h2>Filtered Response</h2>
      <pre style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '10px', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}>
        {getFilteredResponse()}
      </pre>
    </div>
  );
};

export default App;