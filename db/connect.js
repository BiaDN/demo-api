const mongoose = require('mongoose')
// const connectString = 'mongodb+srv://tan0811:024680@cluster0.ibspz.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority'

const connectDb = (url) => {
    return mongoose.connect(url).then(() => console.log('connect db success')).catch((err) => console.log(err));
}

module.exports = connectDb;