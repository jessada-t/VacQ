const express = require('express');
const dotenv = require('dotenv');
// Load env vars
dotenv.config({path:'./config/config.env'});
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Route files
const hospitals = require('./routes/hospitals');
const app = express();

// Body parser
app.use(express.json());
app.use('/api/v1/hospitals', hospitals);
app.use('/api/v1/hospital', hospitals);


const PORT=process.env.PORT || 5000;
const server=app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, 'mode on port ', PORT));


//Handle unhandled promise rejections
process.on('unhandledRejection', (err,promise)=>{
    console.log(`Error: $(err.message)`);
    server.close(()=>process.exit(1));
});