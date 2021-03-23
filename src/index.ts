import app from './app';

// require('dotenv').config();

const port = '3003';

app.listen(port, function() {
  console.log('Server is running on PORT:', port);
});

module.exports = app;
