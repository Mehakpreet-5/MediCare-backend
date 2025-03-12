
// const mongoose = require('mongoose');
// // Ensure that you declare your MongoDB URI correctly
// // const MONGO_URI = 'mongodb://localhost:27017/doctor'; // Use const for variable declaration
// const MONGO_URI =process.env.MONGO_URI;
// if (!MONGO_URI) { // Corrected from MONGODB_URI to MONGO_URI
//   throw new Error('Please define the MONGO_URI variable for the MongoDB connection.');
// }

// let cached = global.mongo;

// if (!cached) {
//   cached = global.mongo = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
//       console.log('MongoDB connected');
//       return mongoose;
//     });
//   }
  
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// // signalingServer.js (Node.js server)

// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

// const rooms = {}; // Store rooms and participants

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     const data = JSON.parse(message);

//     switch (data.type) {
//       case 'join':
//         const { roomId } = data;
//         if (!rooms[roomId]) {
//           rooms[roomId] = [];
//         }
//         rooms[roomId].push(ws);
//         break;

//       case 'offer':
//       case 'answer':
//       case 'candidate':
//         // Forward offers, answers, and candidates to the other participant(s)
//         const room = rooms[data.roomId];
//         if (room) {
//           room.forEach((client) => {
//             if (client !== ws) {
//               client.send(JSON.stringify(data));
//             }
//           });
//         }
//         break;
//     }
//   });

//   ws.on('close', () => {
//     // Clean up rooms on disconnect
//     for (const roomId in rooms) {
//       rooms[roomId] = rooms[roomId].filter((client) => client !== ws);
//     }
//   });
// });

// console.log('Signaling server is running on ws://localhost:8080');


// module.exports = dbConnect;

const mongoose = require('mongoose');
require('dotenv').config(); 
// MongoDB URI from environment variable
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI variable for the MongoDB connection.');
}

// Cache to store connection status
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn; // Return cached connection
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering for better performance
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      console.log('MongoDB connected');
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise; // Assign the connection to the cache
  return cached.conn;
}

module.exports = dbConnect;
