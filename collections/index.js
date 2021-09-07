const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION_URL)
.then(() => console.log('DB connnection successful!'))
.catch(err => {
    console.log(err)
});
