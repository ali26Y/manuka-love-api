const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = () => {
    if (isConnected) {
        // console.log('=> using existing database connection');
        return Promise.resolve();
    }

    // console.log('=> using new database connection');
    return mongoose.connect(process.env.REACT_APP_MONGO_URI_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        user: process.env.REACT_APP_MONGO_USERNAME,
        pass: process.env.REACT_APP_MONGO_PASSWORD,
        dbName: process.env.REACT_APP_MONGO_DB,
    })
    .then(db => { 
      isConnected = db.connections[0].readyState;
    });
};
