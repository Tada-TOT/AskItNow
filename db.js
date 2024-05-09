const mongoose = require("mongoose");

const connectDBLocal = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect("mongodb://localhost:27017/s202039980");
    } catch (err) {
        console.error(err);
    }
};

module.exports = {connectDBLocal};
