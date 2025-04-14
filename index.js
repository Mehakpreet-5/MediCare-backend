const express = require("express");
const cors = require("cors");
const app = express();
const book = require('./routes/book');  // Assuming this is the router file
const signupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')
const users = require('./routes/users/index')
const appoint = require('./routes/appoint');
// Allow requests from specific origin
const allowedOrigins = ["http://localhost:3000", "https://medicare-14.netlify.app"];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // if using cookies or authorization headers
}));



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

// app.listen(5000, () => console.log("Server running on port 5000"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
