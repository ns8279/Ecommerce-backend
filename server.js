const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });
sequelize.sync({ force: false }).then(() => { //once you have the association in index.js file , change the force = true and start the server to drop and create the tables. Once thats done, change it back to false
  app.listen(PORT, () => console.log('Now listening'));
});
