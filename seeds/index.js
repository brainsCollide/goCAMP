const mongoose = require('mongoose');
//city dataset//
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
//mongoose schema//
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author:'65c30475ffa9e846a0e8d596',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque labore delectus unde quas nobis magni, architecto adipisci maiores, non rerum aperiam odit maxime incidunt vitae natus accusantium dignissimos eius accusamus.",
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dwmecta8g/image/upload/v1708153977/YelpCamp/f7cz8wvfhyspz8wvnnr4.jpg',
                  filename: 'YelpCamp/f7cz8wvfhyspz8wvnnr4'
                },
                {
                  url: 'https://res.cloudinary.com/dwmecta8g/image/upload/v1708153979/YelpCamp/nqtpm4tqzyppb0yymb0x.jpg',
                  filename: 'YelpCamp/nqtpm4tqzyppb0yymb0x'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})