const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config('./.env');
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log('Connected to DB');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});