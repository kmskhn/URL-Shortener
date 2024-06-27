import { useState, useEffect } from 'react';

const GeoLocationComponent = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setLocation({ lat: latitude, lng: longitude });
  };

  const handleError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }
  }, []);

  return (
    <div>
      <h1>Geolocation</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}
    </div>
  );
};

export default GeoLocationComponent;
