import { Router } from "express";

import { ProjectController, ProjectMiddleware } from "./index";

const routes = Router();

routes.post("/",ProjectMiddleware.filterBody, ProjectMiddleware.convertTechs, ProjectController.create);

routes.get("/",ProjectMiddleware.filterFindAll, ProjectController.findAll);

routes.get("/:id",ProjectMiddleware.filterId, ProjectController.findById);

routes.put("/:id", ProjectMiddleware.convertTechs, ProjectController.update);

routes.delete("/:id", ProjectMiddleware.filterId, ProjectController.delete);

export default routes;
