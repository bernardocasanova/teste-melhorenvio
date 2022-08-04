import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extented: true }));
    this.app.use(express.json());
  }
}

export default new App().app;
