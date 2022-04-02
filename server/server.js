const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

if (dotenv.error) {
    console.log(dotenv.error);
    process.exit(84);
}

const db = require('./database/Connect');

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Origin'],
    exposedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Origin'],
    credentials: false
}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const oAuthRouter = require('./routes/oauth');
const api = require('./routes/api/api');
const services_handler = require('./services_handler');

app.use('/', indexRouter);
app.use('/about.json', aboutRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/oauth', oAuthRouter);
app.use('/api', api);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
