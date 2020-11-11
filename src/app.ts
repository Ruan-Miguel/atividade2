import express, { Application } from "express";
import cors from "cors";

class App {
  public readonly express: Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes() {
    this.express.get("/", (req, res) => {
      return res.json("Tudo ok");
    });
  }
}

export default new App().express;
