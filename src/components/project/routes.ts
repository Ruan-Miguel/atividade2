import { Router } from "express";

import { ProjectController, ProjectMiddleware } from "./index";

const routes = Router();

routes.post("/", ProjectMiddleware.convertTechs, ProjectController.create);

routes.get("/", ProjectController.findAll);

routes.get("/:id", ProjectController.findById);

routes.put("/:id", ProjectMiddleware.convertTechs, ProjectController.update);

routes.delete("/:id", ProjectController.delete);

export default routes;
