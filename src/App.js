const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const { connectDB } = require('./config/dbConfig')
const routes = require('./services');

const app = express();

// good to disable, can help in performance improvement
app.disable('etag')
    .disable('x-powered-by');

const PORT = process.env.PORT || 6311;

const allowedOrigins = [
    'http://localhost:3000',
];
app.use(cors({
    origin(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not '
                + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();
app.use('/todo', routes);
app.get('/check', (req, res) => {
    res.send({
        message: 'OK',
        code: 200,
    });
});
app.use((req, res) => res.status(404).send({ message: 'Request Not Found' }));
app.listen(PORT, () => {
    console.log('Running on port: ', PORT);
});
