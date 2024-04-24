import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import router from './router';


// initiate the app
const app = express();

app.use(bodyParser.json());
app.use(compression());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080")
})

app.use('/', router())