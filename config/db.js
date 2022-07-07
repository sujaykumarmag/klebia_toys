const mongoose = require('mongoose');

connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB connected ${conn.connection.host}`.cyan.underline.bold);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
module.exports = connectDB;
