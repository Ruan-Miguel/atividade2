import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { TechnologyModel } from "../technology";

@Entity("project")
export default class ProjectModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  url!: string;

  @OneToMany(() => TechnologyModel, (technology) => technology.project, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "project_id" })
  techs?: TechnologyModel[];
}
