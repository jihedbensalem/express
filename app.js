const express = require('express');
const app = express();

// Custom middleware to check working hours
const checkWorkingHours = (req, res, next) => {
    const currentTime = new Date();
    const dayOfWeek = currentTime.getDay();
    const hourOfDay = currentTime.getHours();
    
    // Check if it's Monday to Friday and between 9 to 17
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        next(); // Continue to the next middleware or route handler
    } else {
        res.send("Sorry, the website is only available during working hours (Monday to Friday, 9 to 17).");
    }
};

// Use the custom middleware for all routes
app.use(checkWorkingHours);

// Define routes
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Home Page</h1><a href="/services">Our Services</a><br><a href="/contact">Contact Us</a>');
});

app.get('/services', (req, res) => {
    res.send('<h1>Our Services</h1><a href="/">Home</a><br><a href="/contact">Contact Us</a>');
});

app.get('/contact', (req, res) => {
    res.send('<h1>Contact Us</h1><a href="/">Home</a><br><a href="/services">Our Services</a>');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
