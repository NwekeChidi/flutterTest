const mongoose = require('mongoose');

exports.connect = (DB) => {
    return mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connection Successful'))
    .catch((err) => console.log(err));
}