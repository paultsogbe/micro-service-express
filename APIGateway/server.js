
const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const adminMiddleware = require('./middleware/adminMiddleware');

app.use('/api/auth', proxy('http://authservice:8081'));//je change localhost par authservice
app.use('/api/products', proxy('http://productservice:8082'));

// utilisation d'adminMiddleware depuis products
app.use('/api/products', adminMiddleware, proxy('http://productservice:8082'));


app.listen(3000, () => {
  console.log('API Gateway en cours d\'exécution sur le port 3000');
});


// cd APIGateway
// npm init -y
// npm install express express-http-proxy
