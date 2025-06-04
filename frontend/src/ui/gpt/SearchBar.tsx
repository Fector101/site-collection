import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  data: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
  const [query, setQuery] = useState<string>('');

  const filteredData = data.filter(item =>
    item.toLowerCase().trim().includes(query.toLowerCase().trim())
  );

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        style={styles.input}
      />
      {query && (
        <ul style={styles.dropdown}>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <li key={index} style={styles.item}>
                {item}
              </li>
            ))
          ) : (
            <li style={styles.noResult}>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    position: 'relative',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  dropdown: {
    position: 'absolute',
    top: '110%',
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    listStyle: 'none',
    padding: 0,
    margin: '4px 0 0 0',
    maxHeight: '300px',
    overflowY: 'auto',
    zIndex: 10,
  },
  item: {
    padding: '10px 16px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    color: 'black',
  },
  noResult: {
    padding: '10px 16px',
    color: '#888',
  },
};

export default SearchBar;
