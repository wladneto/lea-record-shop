
const express = require("express");
const serverless = require("serverless-http");
const routes = require('./routes');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Lea Records API versão 1.0.0')
})

app.use('/api', routes);


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Route not Found",
  });
});


module.exports.handler = serverless(app);
