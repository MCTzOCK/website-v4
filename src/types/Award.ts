/**
 * src/types/Award.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 12.06.2023
 *
 */
import { PromotedProject } from "@/types/PromotedProject";

export interface Award {
  _id: string;
  date: string;
  project: PromotedProject;
  title: string;
  description: string;
  __v: number;
}
