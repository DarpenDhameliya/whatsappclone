const mongoose = require('mongoose');
const mongourl = 'mongodb+srv://darpensstpl:BnrKB3DBCeEiWC2x@cluster0.udjynea.mongodb.net/?retryWrites=true&w=majority'


const mongoconnect = async () => {
    try {
        mongoose.connect(mongourl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName: 'sstpl_whatsapp'
      });
      console.log('MongoDB Connected...');
    } catch (err) {
        console.error('============>', err);
    }
}

module.exports = mongoconnect;