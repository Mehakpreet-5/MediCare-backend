// const express = require("express");
// const cors = require("cors");
// const app = express();
// const book = require('./routes/book');  // Assuming this is the router file
// const signupRoute = require('./routes/signup')
// const loginRoute = require('./routes/login')
// const users = require('./routes/users/index')
// const appoint = require('./routes/appoint');



// // Middleware to parse JSON request bodies
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Medicare backend is running!");
// });

// // Routes
// app.use('/api/bookings', book);  // Use the 'book' router for the '/api/bookings' path
// app.use('/api/signup', signupRoute);
// app.use('/api/login', loginRoute);
// app.use('/api/users', users );
// app.use('/api/appoint', appoint);
// app.get("/data", (req, res) => {
//   res.json({ message: "Hello World" });
// });




// // ✅ CORS options
// const corsOptions = {
//   origin: "https://medicare-14.netlify.app", 
//   methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
//   credentials: true,
// };

// // ✅ Apply CORS middleware
// app.use(cors(corsOptions));

// // ✅ (Optional) Manually set headers
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://medicare-14.netlify.app");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,HEAD,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

// // ✅ Handle preflight OPTIONS requests////
// app.options("*", cors(corsOptions));


// // process.env.PORT ||
// // app.listen(5000, () => console.log("Server running on port 5000"));
// const PORT =  5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// ✅ CORS configuration
app.use(cors({
  origin: "https://medicare-14.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Medicare backend is running!");
});

app.get("/data", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use('/api/bookings', require('./routes/book'));
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/users', require('./routes/users/index'));
app.use('/api/appoint', require('./routes/appoint'));

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
