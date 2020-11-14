import { Request, Response, NextFunction } from "express";

export default class ProjectMiddleware {
  public static async convertTechs(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const primitiveTechs = req.body.techs;

    if (Array.isArray(primitiveTechs)) {
      const formatedTechs = primitiveTechs.map((tech) => {
        return {
          name: tech,
        };
      });

      req.body.techs = formatedTechs;
    }

    next();
  }
}
