import { getRepository } from "typeorm";

import { TechnologyModel } from "./index";

export default class TechnologyService {
  public static async update(
    id: any,  
    techs: {
    name: string 
  }[]) {
    const result = await getRepository(TechnologyModel).find(
        {project: id},
    );
    const unchanged = techs.filter((tech) => {
      return result.some( (technology: { name: string; }) => technology.name === tech.name);
    });

    const unsend = result.filter((tech) => {
      return !techs.some( (technology: { name: string; }) => technology.name === tech.name);
    });

    const union = [...unchanged, ...unsend];
    const changed = techs.filter(intersection => {
      return !union.some( (technology: { name: string; }) => technology.name === intersection.name);
    });
    
    // console.log(techs);
    console.log(union);
    // console.log(changed);
    // getRepository(TechnologyModel).save(...changed);
  }
}
