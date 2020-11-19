import { getRepository } from "typeorm";

import { TechnologyModel } from "./index";

export default class TechnologyService {
  public static async update(
    id: any,  
    techs: {
    name: string 
  }[]) {
    const technologyRepository = await getRepository(TechnologyModel)
    const result = await technologyRepository.find(
        {project: id},
    );
    const unchanged = techs.filter((tech) => {
      return result.some( (technology: { name: string; }) => technology.name === tech.name);
    });

    const unsend = result.filter((tech) => {
      return !techs.some( (technology: { name: string; }) => technology.name === tech.name);
    });

    await Promise.all(unsend.map(async toDelete => await technologyRepository.delete({project: id, name: toDelete.name})))

    const union = [...unchanged, ...unsend];
    const changed = techs.filter(intersection => {
      return !union.some( (technology: { name: string; }) => technology.name === intersection.name);
    });
    await Promise.all(changed.map(async toUpdate => await technologyRepository.insert({project: id, name: toUpdate.name})))
    
    console.log(unsend)
    // console.log(techs);
    // console.log(union);
    console.log(changed);
    // getRepository(TechnologyModel).save(...changed);
  }
}
