const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const URI = process.env.MONGO_ATLAS_URI;
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log("database connected");
    }
    catch (error) {
        console.log('database connection error', error);
        process.exit(1);

    }
}
module.exports = { connectDB }

