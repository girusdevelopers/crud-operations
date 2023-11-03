import app from "@/app";
import { logger } from "@utils/logger";
import { NODE_ENV } from "@config";
import { MONGODB_URI, PORT } from '@config';
import validateEnv from "@utils/validateEnv";
import routes from './routes';
import connection from '@/databases';
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// io.on('connection', (socket) => {
//   logger.info('A user connected');

//   socket.on('msg_from_client', (from, msg) => {
//     logger.info(`Received message from ${from}: ${msg}`);
//     io.emit('message', { from, message: `Server broadcast: ${msg}` });
//   });

//   socket.on('disconnect', () => {
//     logger.info('A user disconnected');
//   });
// });


validateEnv();
connection(MONGODB_URI);

const version = '/v1';
routes.forEach((route) => {
  const path = version + route.path;
  app.use(path, route.func);
});


app.listen(PORT, () => {
  logger.info(`======= ENV: ${NODE_ENV} =======`);
  logger.info(`🚀 App listening on the port http://localhost:${PORT}`);
});

  // const io = socket(server);
  // io.on("connection", function (socket) {
  //   console.log("Made socket connection");
  
  //   // socket.on("disconnect", function () {
  //   //   console.log("Made socket disconnected");
  //   // });
  
  //   socket.on("message", function (data) {
  //     console.log(`Recived message: ${data.message}`)
  //     io.emit("message", { message: `Server broadcast: ${data.message}`});
  //   });
  // })