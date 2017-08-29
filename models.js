const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/regNumbers";

mongoose.connect(mongoURL, {
  useMongoClient: true
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('database ready to be used...');
  }
});
const Registration = mongoose.model('Registration', {
  plateNumber: String,
  filterReg: String

});

module.exports = Registration;
