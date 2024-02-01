import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Fragment, useLayoutEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { GetAutocompletePlaces } from '../../services/entities';
import { getAutocompletePlaces } from '../../services/googleMapService';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

type AutocompleteComponentProps = {
  onLocationSelect: (location: GetAutocompletePlaces) => void;
};

const AutocompleteComponent = ({
  onLocationSelect,
}: AutocompleteComponentProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedLocation, setSelectedLocation] =
    useState<GetAutocompletePlaces | null>(null);

  const {
    data: places,
    refetch,
    isLoading,
  } = useQuery(
    ['getPlaces', selectedLocation],
    () => getAutocompletePlaces(inputValue),
    { enabled: false }
  );

  const handleSelectLocation = (location: GetAutocompletePlaces | null) => {
    setSelectedLocation(location);
    if (location) {
      onLocationSelect(location);
    }
  };

  const getPlaces = (): GetAutocompletePlaces[] => {
    if (places?.data) {
      return places?.data;
    }

    return [];
  };

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position, 'position');
        setSelectedLocation({
          id: 'current-location',
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: 'Current location',
          description: 'Current location',
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  return (
    <div>
      <Autocomplete<GetAutocompletePlaces>
        options={getPlaces()}
        loading={isLoading}
        getOptionLabel={(option: GetAutocompletePlaces) =>
          `${option.name} - ${option.description}`
        }
        onChange={(_, value) => handleSelectLocation(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search location"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
              refetch();
            }}
          />
        )}
      />

      {selectedLocation && (
        <LoadScript googleMapsApiKey="AIzaSyBcvQmEiJSo5pn0dROXZyK8u6YBVtSRUXc">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: selectedLocation.lat,
              lng: selectedLocation.lng,
            }}
            zoom={17}
          >
            <Marker
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
              icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default AutocompleteComponent;
