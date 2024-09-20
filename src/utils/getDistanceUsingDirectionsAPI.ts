import axios from 'axios';

export const getDistanceUsingDirectionsAPI = async (
  origin: string,
  destination: string,
) => {
  origin = '28.7041,77.1025';
  destination = '28.0355,77.9910';
  const url = `https://router.project-osrm.org/route/v1/driving/${origin};${destination}?overview=false`;
  console.log('URL: ', url);
  // const url = `http://router.project-osrm.org/route/v1/driving/28.7041,77.1025;28.0355,77.8910;?overview=false`;

  try {
    const response = await axios.get(url);

    if (response.data.routes.length > 0) {
      const distance = response.data.routes[0].distance / 1000; // Distance in kilometers
      const duration = response.data.routes[0].duration / 60; // Duration in minutes

      console.log(`Distance: ${distance} km, Duration: ${duration} minutes`);
      return {distance, duration};
    } else {
      console.error('No routes found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching OSRM data:', error);
    return null;
  }
};
