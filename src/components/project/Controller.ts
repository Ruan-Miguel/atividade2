import { Request, Response } from "express";

import { ProjectService } from "./index";

export default class ProjectController {
  public static async create(req: Request, res: Response) {
    return ProjectService.create(req.body)
      .then((rs) => res.status(201).json(rs).send())
      .catch((err) => res.status(400).json({ error: err.message }));
  }

  public static async findAll(req: Request, res: Response) {
    return ProjectService.findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json({ error: err.message }));
  }

  public static async findById(req: Request, res: Response) {
    return ProjectService.findById(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json({ error: err.message }));
  }

  public static async update(req: Request, res: Response) {
    return ProjectService.update({ id: req.params.id, ...req.body })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json({ error: err.message }));
  }

  public static async delete(req: Request, res: Response) {
    return ProjectService.delete(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => res.status(400).json({ error: err.message }));
  }
}
