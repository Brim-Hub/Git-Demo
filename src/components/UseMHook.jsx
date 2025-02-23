import React, { useState, useEffect } from 'react';

// API call function to fetch photos
const fetchPhotosData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const UseMHook = () => {
  const [data, setData] = useState([]); // To store API response data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle any errors

  // Fetch the data when the component is mounted
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchPhotosData();
        setData(fetchedData.slice(0, 4)); // Only take the first 4 photos
      } catch (error) {
        setError('Failed to load data'); // Error handling
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getData(); // Call the fetch function
  }, []); // Empty dependency array means it runs once on mount

  // Handle loading, error, and rendering
  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if an error occurred
  }

  // Render the photo data
  return (
    <div>
      <h1>Fetched Photos</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <img src={item.url} alt={item.title} style={{ width: '200px', height: 'auto' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UseMHook;
