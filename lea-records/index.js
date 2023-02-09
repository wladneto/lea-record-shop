const infos = require('./package.json')
const express = require("express");
const serverless = require("serverless-http");
const routes = require('./routes/order-route');
const routesUsers = require('./routes/user-route');
const routesDisks = require('./routes/disk-route');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send( {message : 'Lea Records API', version: infos.version })
})

app.use('/api', routes);

app.use('/api/users', routesUsers);

app.use('/api/disks', routesDisks);

app.use('/api/orders', routesDisks);


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Route not Found",
  });
});


module.exports.handler = serverless(app);
