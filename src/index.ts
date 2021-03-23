import app from './app';

import dotenv from 'dotenv';
dotenv.config();

const port = '3003';

app.listen(port, function() {
    console.log('Server is running on PORT:', port);
});

module.exports = app;