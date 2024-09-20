import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GetLocation from 'react-native-get-location';
import MapView, {Circle, MapPressEvent, Marker} from 'react-native-maps';

import {RootStackParamList} from '../App';
import {getDistance} from 'geolib';
import {restaurantData} from '../data/restaurantData';
import {useStore} from '../store/restaurantStore';
import {Picker} from '@react-native-picker/picker';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({navigation}: HomeProps) {
  const [filteredRestaurants, setFilteredRestaurants] = useState<Menu[]>([]);
  // const [distanceArray, setDistanceArray] = useState<number[]>([]);
  const {maxDistance, setMaxDistance} = useStore();

  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [source, setSource] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  async function getUserLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log(location);
        setLocation({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        const restaurantWithinRange = restaurantData.filter(restaurant => {
          const distance = getDistance(location, restaurant.location) / 1000;
          // return distance < MAX_DISTANCE;
          if (distance < maxDistance) {
            restaurant.distance = distance;
            return true;
          }
        });
        setFilteredRestaurants(restaurantWithinRange);
        setPermissionGranted(true);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }

  // Function called when any click on map occurs

  useEffect(() => {
    getUserLocation();
  }, [maxDistance]);

  if (!permissionGranted) {
    return (
      <View style={styles.noPermissionContainer}>
      <Image 
        source={require("../assets/Pictures/no_permission.png")} 
        style={styles.noPermissionImage} 
      />
      <Text style={styles.noPermissionTitle}>Location Permission Not Granted</Text>
      <Text style={styles.noPermissionDescription}>
        We need your location to provide better services. Please enable location permission in your settings.
      </Text>
    </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude: source ? source.latitude : location.latitude,
          longitude: source ? source.longitude : location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        showsUserLocation={true}>
        {source && (
          <Marker
            key={`${source.latitude}-${source.longitude}`}
            coordinate={source}
            title={'Source'}
            description={'Source Location'}
            pinColor="green"
            draggable={true}
            onDragEnd={e => {
              setSource(e.nativeEvent.coordinate);
            }}
          />
        )}

        {filteredRestaurants &&
          filteredRestaurants.map((restaurant, index) => {
            console.log(
              'first',
              restaurant.location,
              ' ',
              restaurant.restaurant,
              restaurant.distance
            );
            return (
              <Marker
                key={index}
                coordinate={restaurant.location}
                title={restaurant.restaurant}
                description={`${restaurant.description}`}
                pinColor={'blue'}
                onPress={() =>
                  navigation.navigate('Restaurant', {
                    id: restaurant.id,
                  })
                }
              />
            );
          })}
        {location && (
          <Circle
            center={location}
            radius={maxDistance * 1000}
            strokeColor="rgba(0, 150, 255, 0.5)" // Optional: Circle border color
            fillColor="rgba(0, 150, 255, 0.1)" // Optional: Circle fill color
          />
        )}
      </MapView>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Showing restaurants within {maxDistance} km of your current location
        </Text>

        {/* Dropdown for selecting maxDistance */}
        <Picker
          selectedValue={maxDistance}
          onValueChange={itemValue => setMaxDistance(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="5 km" value={5} />
          <Picker.Item label="10 km" value={10} />
          <Picker.Item label="15 km" value={15} />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    display: 'flex',
    gap: 3,
    paddingHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'transparent',
    width: '100%',
    height: 40,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: 150,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  noPermissionImage: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  noPermissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noPermissionDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  noPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  }
});
