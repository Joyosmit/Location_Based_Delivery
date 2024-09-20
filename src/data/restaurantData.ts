export const restaurantData: Menu[] = [
    {
        id: 1,
        restaurant: 'KFC',
        description: 'Finger Licking Good',
        distance: 0,
        deliveryChargeBase: 50,
        deliveryChargePerKm: 10,
        location: {
            latitude: 22.504167134417226,
            longitude: 88.25306267917156
        },
        menu: [
            {
                name: 'Chicken Bucket',
                price: 400,
                image: require("../assets/Pictures/Chicken_1.png"),
                discountPercent: 10
            },
            {
                name: 'Chicken Popcorn',
                price: 200,
                image: require('../assets/Pictures/Chicken_2.png')
            },
            {
                name: 'Chicken Wings',
                price: 300,
                image: require('../assets/Pictures/Chicken_3.png')
            }
        ]
    },
    {
        id: 2,
        restaurant: 'Burger King',
        distance: 0,
        description: 'Have it your way',
        deliveryChargeBase: 40,
        deliveryChargePerKm: 15,
        location: {
            latitude: 22.496104226157414,
            longitude: 88.23522314429283
        },
        menu: [
            {
                name: 'Burger Combo',
                price: 199,
                image: require("../assets/Pictures/Burger_1.png"),
                discountPercent: 10
            },
            {
                name: 'Chicken Burger',
                price: 149,
                image: require('../assets/Pictures/Burger_2.png')
            },
            {
                name: 'Premium Burger',
                price: 199,
                image: require('../assets/Pictures/Burger_3.png')
            },
            {
                name: 'Fried Chicken Burger',
                price: 249,
                image: require('../assets/Pictures/Burger_4.png')
            },
            
        ]
    },
    {
        id: 3,
        restaurant: 'Burger King',
        description: 'Have it your way',
        deliveryChargeBase: 40,
        deliveryChargePerKm: 15,
        distance: 0,
        location: {
            latitude: 22.494104226157414,
            longitude: 88.26522314429283
        },
        menu: [
            {
                name: 'Burger Combo',
                price: 199,
                image: require("../assets/Pictures/Burger_1.png"),
                discountPercent: 10
            },
            {
                name: 'Chicken Burger',
                price: 149,
                image: require('../assets/Pictures/Burger_2.png')
            },
            {
                name: 'Premium Burger',
                price: 199,
                image: require('../assets/Pictures/Burger_3.png')
            },
            {
                name: 'Fried Chicken Burger',
                price: 249,
                image: require('../assets/Pictures/Burger_4.png')
            },
            
        ]
    },
    {
        id: 4,
        restaurant: 'ABC Burger',
        distance: 0,
        description: 'Premium quality burgers',
        deliveryChargeBase: 40,
        deliveryChargePerKm: 15,
        location: {
            latitude: 22.498104226157414,
            longitude: 88.27922314429283
        },
        menu: [
            {
                name: 'Burger Combo',
                price: 199,
                image: require("../assets/Pictures/Burger_1.png"),
                discountPercent: 10
            },
            {
                name: 'Chicken Burger',
                price: 149,
                image: require('../assets/Pictures/Burger_2.png')
            },
            {
                name: 'Premium Burger',
                price: 199,
                image: require('../assets/Pictures/Burger_3.png')
            },
            
        ]
    }
]

export const BASE_DISTANCE = 2;