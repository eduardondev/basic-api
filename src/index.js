require('dotenv').config()
import Express from 'express'
import Cors from "cors"
import { router } from '~/routes/'

const App = Express()

App.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,DELETE');
  App.use(Cors());
  next();
});

App.use(router);

App.listen(process.env.SERVER_PORT, () => {
  console.log(`${process.env.SERVER_NAME} is running on ${process.env.SERVER_PORT}`)
})
