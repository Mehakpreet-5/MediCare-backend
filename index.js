const express = require("express");
const cors = require("cors");
const app = express();
const book = require('./routes/book');  // Assuming this is the router file
const signupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')
const users = require('./routes/users/index')
const appoint = require('./routes/appoint');
// Allow requests from specific origin
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/bookings', book);  // Use the 'book' router for the '/api/bookings' path
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/users', users );
app.use('/api/appoint', appoint);
app.get("/data", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
