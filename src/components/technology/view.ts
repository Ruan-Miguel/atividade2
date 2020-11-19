import { ProjectModel } from "../project";

export default class TechnologyView {
  public static convertToText(
    project: ProjectModel
  ) {
    const {techs:primitiveTechs, ...rest} = project;
    if (Array.isArray(primitiveTechs)) {
      const formatedTechs = primitiveTechs.map((tech) => {
        return tech.name
      });
      return Object.assign(rest, {techs: formatedTechs})
    }
    return rest;
  }
  public static viewAllText(
    projects: ProjectModel[]
  ) {
    return projects.map(project => this.convertToText(project));
  }

}
