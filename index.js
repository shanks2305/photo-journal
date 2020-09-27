require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors');
const helmet = require('helmet');
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser');

const userRoute = require('./routes/User');
const photosRoute = require('./routes/Photos');

const app = express()


mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('DB CONNECTED'))
    .catch(() => console.log('Error while connecting to db'))

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieparser());
app.use(bodyparser.json());

app.use('/api/user', userRoute);
app.use('/api/photos', photosRoute);

const PORT = 8000

app.listen(PORT, () => console.log('connected'));