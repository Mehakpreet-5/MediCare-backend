// // pages/api/appointments/index.js
// import dbConnect from '../../db.js';
// import Appointment from '../../models/Appointment.js';

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === 'GET') {
//     const appointments = await Appointment.find({});
//     return res.status(200).json(appointments);
//   } 

//   if (req.method === 'POST') {
//     const { doctor, patient, date, time } = req.body;
//     const newAppointment = new Appointment({ doctor, patient, date, time });
//     await newAppointment.save();
//     return res.status(201).json(newAppointment);
//   }
// }
