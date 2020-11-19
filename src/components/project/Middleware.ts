import { Request, Response, NextFunction, json } from "express";
import validate from "uuid-validate";

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
  public static async filterBody(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if(!(req.body.title && req.body.url && Array.isArray(req.body.techs))){
      return res.status(400).send('Dados insuficientes')
    }
    next();
  }
  public static async filterFindAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if(!(req.body.constructor === Object && Object.keys(req.body).length === 0)) {
      return res.status(400).send('Esta requisição não deve conter dados');
    }
    next();
  }
  public static async filterId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // validar a existencia do ID no banco;
    if(!validate(req.params.id)){
      return res.status(400).send('O parametro ID não é válido')
    }
    next();
  }
}
