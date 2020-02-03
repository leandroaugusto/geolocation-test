import React, { useEffect, useState } from 'react';

import './App.style.scss';

const templateState = {
  loading: true,
  error: '',
};

const App = () => {
  const [geoLocation, setGeoLocation] = useState({
    latitude: null,
    longitude: null,
    allow: null,
    ...templateState,
  });
  const [region, setRegion] = useState({
    locality: null,
    city: null,
    state: null,
    ...templateState,
  });

  useEffect(() => {
    (async () => {
      const { loading } = geoLocation;
      if (loading) {
        const success = ({ coords: { latitude, longitude } }) => {
          setGeoLocation({
            ...geoLocation,
            latitude,
            longitude,
            allow: true,
            loading: false,
          });
        };
        const error = () => {
          setGeoLocation({
            ...geoLocation,
            allow: false,
            loading: false,
            error: 'Localização não autorizada!',
          });
        };

        await navigator.geolocation.getCurrentPosition(success, error);
      }
    })();
  }, [geoLocation]);

  useEffect(() => {
    (async () => {
      const { latitude, longitude, allow } = geoLocation;
      const { loading } = region;

      if (allow && loading) {
        await fetch(
          `https://app.geocodeapi.io/api/v1/reverse?point.lat=${latitude}&point.lon=${longitude}&apikey=c2e3b9e0-f100-11e9-9276-455368fdeb88`,
        )
          .then(res => res.json())
          .then(({ features }) => {
            const formatGeo = features.map(({ properties }) => ({
              locality: properties.locality,
              city: properties.region,
              state: properties.region_a,
            }));

            setRegion({ ...region, ...formatGeo[0], loading: false });
          })
          .catch(err => {
            console.error(err);
            setRegion({ ...region, loading: false, error: err.message });
          });
      } else if (loading && allow === false) {
        setRegion({ ...region, loading: false });
      }
    })();
  }, [geoLocation, region]);

  console.log('RENDER', geoLocation, region);

  return geoLocation.loading || region.loading ? (
    <h2>Carregando...</h2>
  ) : (
      <div className="app">
        <h1>Geolocation App</h1>
        {geoLocation.error && <h3>{geoLocation.error}</h3>}
        {region.error && <h3>{region.error}</h3>}
        {region.city && <h3>{region.city}</h3>}
      </div>
    );
};

export default App;
