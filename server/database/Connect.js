const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        authSource: 'admin'
    },
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS
})
    .then(() => console.log('Connection to MongoDB successfully established.'))
    //.then(() => mongoose.connection.db.dropCollection('users'))
    //.then(() => mongoose.connection.db.dropCollection('widgets'))
    .catch(err => console.error(err));

const db = mongoose.connection;

module.exports = db;
