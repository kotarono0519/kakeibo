const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');


const whitelist = ['http://localhost:3001'];
const corsQptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        };
    }
};

app.use(helmet());
app.use(cors(corsQptions));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/', require('./src/routes'));

app.listen(process.env.PORT || 3000, () => {
    console.log(`port ${process.env.PORT || 3000}`);
});