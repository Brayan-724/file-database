const mongoose = require('mongoose');

function run(URL){
    return new Promise((resolve, reject) => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
    
        mongoose.connect(URL);
    
        mongoose.Promise = global.Promise;
    
        const db = mongoose.connection;
    
        db.once('open', () => {
            console.log('Conected to DB');
            resolve(db);
        });
    
        db.on('error', err => {
            console.error('MongoDB connection error:', err);
            reject(err);
        });
    });
};

module.exports = run;