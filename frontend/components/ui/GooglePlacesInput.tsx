import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface GooglePlacesInputProps {
  onPlaceSelected?: (data: any, details: any) => void;
}

const GooglePlacesInput = ({ onPlaceSelected }: GooglePlacesInputProps) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Rechercher un lieu"
      query={{
        key: 'AIzaSyDkIv0so57OOaI4BsPCNEYlTyXvGngjX3k',
        language: 'fr',
        components: 'country:fr',
        types: 'establishment',
      }}
      currentLocation={false}
      currentLocationLabel="Current location"
      debounce={0}
      enablePoweredByContainer={false}
      fetchDetails={true}
      listViewDisplayed="auto"
      filterReverseGeocodingByTypes={[]}
      GooglePlacesDetailsQuery={{}}
      GooglePlacesSearchQuery={{
        rankby: 'relevance',
        type: 'restaurant',
      }}
      GoogleReverseGeocodingQuery={{}}
      listUnderlayColor="#c8c7cc"
      minLength={2}
      nearbyPlacesAPI="GooglePlacesSearch"
      numberOfLines={1}
      onFail={() => { }}
      onPress={(data, details = null) => {
        if (onPlaceSelected) {
          onPlaceSelected(data, details);
        }
      }}
      predefinedPlaces={[]}
      predefinedPlacesAlwaysVisible={false}
      suppressDefaultStyles={true}
      textInputProps={{}}
      disableScroll={true}
      styles={{
        textInputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f3f4f6',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#e5e7eb',
          paddingHorizontal: 12,
          height: 44,
        },
        textInput: {
          flex: 1,
          color: '#1e293b',
          fontSize: 16,
          backgroundColor: 'transparent',
          verticalAlign: 'middle',
        },
        listView: {
          marginTop: 4,
          borderRadius: 12,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#e5e7eb',
        },
        row: {
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
        },
        description: {
          color: '#1e293b',
        },
      }}
    // timeout={20000}
    />
  );
};

export default GooglePlacesInput;