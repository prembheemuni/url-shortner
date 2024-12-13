import mongoose from "mongoose";

const connectToMongoose = (url) => {
    return mongoose.connect(url)
}

export default connectToMongoose;

