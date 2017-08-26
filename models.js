const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/regNumbers";

module.exports = function(mongoURL){
    mongoose.connect(mongoURL,{
    useMongoClient: true
  }, function(err){
    if(err){
      console.log(err);
    }else{
      console.log('database ready to be used...');
    }
  });
    const RegistrationSchema = mongoose.Schema({name : String});
    RegistrationSchema.index({name : 1}, {unique : true});

    const Registration = mongoose.model('Registration', RegistrationSchema);
    module.exports = Registration;

    return {
        Registration
    };

}
