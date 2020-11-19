import { getRepository } from "typeorm";
import { TechnologyService } from "../technology";

import { ProjectModel } from "./index";

export default class ProjectService {
  public static async create(project: {
    title: string;
    url: string;
    techs: { name: string }[];
  }) {
    const projectRepository = getRepository(ProjectModel);
    const toSave = projectRepository.create(project);
    return await projectRepository.save(toSave)
  }

  public static async findAll() {
    return getRepository(ProjectModel).find({ relations: ["techs"] });
  }

  public static async findById(id: string) {
    return getRepository(ProjectModel).findOneOrFail(
      { id },
      { relations: ["techs"] },
    )
  }

  public static async update({
    id,
    techs,
    ...rest
  }: {
    id: string
    title: string;
    url: string;
    techs: {
      name: string 
    }[];
  }) {
    
    await TechnologyService.update(id, techs);

    const projectToUpdate = await ProjectService.findById(id);

    return getRepository(ProjectModel).save({ ...projectToUpdate, ...rest });
  }

  public static async delete(id: string) {
    await ProjectService.findById(id);

    await getRepository(ProjectModel).delete({ id });

    return ProjectService.findById(id)
      .then(() => {
        throw new Error("there was a problem with the removal");
      })
      .catch(() => {});
  }
}
