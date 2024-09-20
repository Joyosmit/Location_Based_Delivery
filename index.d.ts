type Location = {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
}
type Menu = {
    id: number;
    description: string;
    deliveryChargeBase: number;
    deliveryChargePerKm: number;
    restaurant: string;
    location: Location;
    menu: FoodItem[];
    distance: number;
}
type FoodItem = {
    name: string;
    price: number;
    image: ImageSourcePropType;
    discountPercent?: number;
}