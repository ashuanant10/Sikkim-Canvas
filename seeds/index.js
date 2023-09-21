const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect("mongodb://localhost:27017/Yelp-Camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63148341ef3fc65d61ffea65',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    
                    url: 'https://res.cloudinary.com/anurag5963/image/upload/v1664215779/YelpCamp/mzyd8pw4i9tkaepckoqt.jpg',
                    filename: 'YelpCamp/mzyd8pw4i9tkaepckoqt'
                },
                {
                    url: 'https://res.cloudinary.com/anurag5963/image/upload/v1664215798/YelpCamp/sqtsdlqt9q9wts8qyhn6.jpg',
                    filename: 'YelpCamp/sqtsdlqt9q9wts8qyhn6'
                },
                {
                    url: 'https://res.cloudinary.com/anurag5963/image/upload/v1664215799/YelpCamp/aqcezu8xxqxyiadulpqh.jpg',
                    filename: 'YelpCamp/aqcezu8xxqxyiadulpqh'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})