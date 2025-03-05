const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db.js");
const Task = require("../models/Task.js");

dotenv.config();
connectDB();

// List of sample travel destinations with image links
const travelDestinations = [
  { name: "Paris", image: "https://media.timeout.com/images/106181719/750/562/image.jpg" },
  { name: "New York", image: "https://www.travelguide.net/media/new-york.jpeg" },
  { name: "Tokyo", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/640px-Skyscrapers_of_Shinjuku_2009_January.jpg" },
  { name: "London", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/640px-London_Skyline_%28125508655%29.jpeg" },
  { name: "Sydney", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/800px-Sydney_Opera_House_-_Dec_2008.jpg" },
  { name: "Rome", image: "https://miro.medium.com/v2/resize:fit:1400/1*gfzxEKbwzFDI8L-h2FQSrw.jpeg" },
  { name: "Berlin", image: "https://source.unsplash.com/500x300/?berlin" },
  { name: "Dubai", image: "https://source.unsplash.com/500x300/?dubai" },
  { name: "Barcelona", image: "https://source.unsplash.com/500x300/?barcelona" },
  { name: "Istanbul", image: "https://source.unsplash.com/500x300/?istanbul" },
  { name: "Bangkok", image: "https://source.unsplash.com/500x300/?bangkok" },
  { name: "Los Angeles", image: "https://source.unsplash.com/500x300/?los-angeles" },
  { name: "Singapore", image: "https://source.unsplash.com/500x300/?singapore" },
  { name: "Amsterdam", image: "https://source.unsplash.com/500x300/?amsterdam" },
  { name: "Madrid", image: "https://source.unsplash.com/500x300/?madrid" },
  { name: "Cape Town", image: "https://source.unsplash.com/500x300/?cape-town" },
  { name: "Hong Kong", image: "https://source.unsplash.com/500x300/?hong-kong" },
  { name: "Seoul", image: "https://source.unsplash.com/500x300/?seoul" },
  { name: "Moscow", image: "https://source.unsplash.com/500x300/?moscow" },
  { name: "Rio de Janeiro", image: "https://source.unsplash.com/500x300/?rio-de-janeiro" },
  { name: "San Francisco", image: "https://source.unsplash.com/500x300/?san-francisco" },
  { name: "Cairo", image: "https://source.unsplash.com/500x300/?cairo" },
  { name: "Venice", image: "https://source.unsplash.com/500x300/?venice" },
  { name: "Florence", image: "https://source.unsplash.com/500x300/?florence" },
  { name: "Prague", image: "https://source.unsplash.com/500x300/?prague" },
  { name: "Vienna", image: "https://source.unsplash.com/500x300/?vienna" }
];

// Generate 400 tasks dynamically
const tasks = Array.from({ length: 400 }, (_, i) => {
  const tie = Math.random() < 0.5;
  const destination = travelDestinations[i % travelDestinations.length]; 

  let value, profit;

  if (tie) {
    value = (Math.random() * (10000 - 100) + 100).toFixed(2); 
    profit = (value * 0.1).toFixed(2); 
  } else {
    value = (Math.random() * 50).toFixed(2); 
    profit = (value * 0.01).toFixed(2);
  }

  return {
    name: `${destination.name} Trip ${i + 1}`,
    value: parseFloat(value),
    profit: parseFloat(profit),
    tie,
    link: destination.image, 
  };
});

const seedDB = async () => {
  try {
    await Task.deleteMany();
    await Task.insertMany(tasks); 
    console.log("✅ 400 Tasks Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error Seeding Tasks:", error);
    process.exit(1);
  }
};

seedDB();
