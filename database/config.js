const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        mongoose.set( 'strictQuery', false );

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'HomeQuestDB'
        })

        console.log('DB connected');

    } catch (error) {
        console.log( error );
        throw new Error('Error when initializing DB');
    }

}

module.exports = {
    dbConnection
}