const mongoose = require('mongoose');

exports.connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://alishakhan1843:bWANnIDjT3bgDVPw@cluster0.77aflrb.mongodb.net/?retryWrites=true&w=majority')
        console.log("DataBase connected !")
    } catch (error) {
        console.log(error);
    }
};
