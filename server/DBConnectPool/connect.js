import mongoose from 'mongoose';

const connectDB = (url) => {
    mongoose.set('strictQuery',true);
    
    //catch 关键字用来处理异常
    mongoose.connect(url)
        .then(()=> console.log('MongoDB connected'))
        .catch((err)=> console.log(err));
}

export default connectDB