import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {BASE_DISTANCE, restaurantData} from '../data/restaurantData';
import { useStore } from '../store/restaurantStore';


type RestaurantProps = NativeStackScreenProps<RootStackParamList, 'Restaurant'>;
export default function Restaurant({route, navigation}: RestaurantProps) {
  const [txt, setTxt] = useState<string | null>(null);
  const {maxDistance} = useStore();
  const {id} = route.params;

  const distExtra = restaurantData[id-1].distance>BASE_DISTANCE? restaurantData[id-1].distance - BASE_DISTANCE: 0;
  const additionalCharge = Math.ceil(distExtra) * restaurantData[id - 1].deliveryChargePerKm;
  console.log(maxDistance, " ", restaurantData[id-1].distance);
  console.log("Additional Charge: ", additionalCharge);
  const totalDeliveryCharge = restaurantData[id - 1].deliveryChargeBase + additionalCharge;

  

  return (
    <View style={styles.container}>
      {/* Restaurant Name */}
      <Text style={styles.restaurantName}>
        {restaurantData[id - 1].restaurant}
      </Text>

      {/* Food Items List */}
      <FlatList
        data={restaurantData[id - 1].menu}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <View style={styles.foodItem}>
            <Image source={item.image} style={styles.foodImage} />
            <View style={styles.foodDetails}>
              {txt && <Text>{txt}</Text>}
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPrice}>₹{item.price}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Delivery Charge */}
      <Text style={styles.deliveryCharge}>
        Delivery Charge: ₹{totalDeliveryCharge} (Base: ₹{restaurantData[id - 1].deliveryChargeBase}, Additional: ₹{additionalCharge})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  foodItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  foodImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16,
  },
  foodDetails: {
    justifyContent: 'center',
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodPrice: {
    fontSize: 16,
    color: '#333',
  },
  deliveryCharge: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: 'green',
  },
});
