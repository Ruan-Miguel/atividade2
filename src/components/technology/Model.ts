import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

import { ProjectModel } from "../project";

@Entity("technology")
export default class TechnologyModel {
  @PrimaryColumn()
  name!: string;

  @ManyToOne(() => ProjectModel, (project) => project.techs, {
    primary: true,
  })
  @JoinColumn({ name: "project_id" })
  project!: ProjectModel;
}
