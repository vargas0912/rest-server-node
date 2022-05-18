const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('Database online');
    } catch  (error) {
        throw new Error('Database error');
    }

}

module.exports = {
    dbConnection
}