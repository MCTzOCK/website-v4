/**
 * src/pages/api/awards/index.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 12.06.2023
 *
 */
import { NextApiRequest, NextApiResponse } from "next";
import mongoConnect from "../../../lib/mongoConnect";
import AwardModel from "../../../lib/models/AwardModel";
import PromotedProjectModel from "@/lib/models/PromotedProjectModel";

export default async function handleRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await mongoConnect();

    const awards: any = [];

    for (const award of await AwardModel.find()) {
      const project = await PromotedProjectModel.findById(award.project);

      if (!project) {
        await award.remove();
        continue;
      }

      awards.push({
        ...award.toJSON(),
        project: project.toJSON(),
      });
    }

    res.status(200).json({
      awards,
    });
  } catch (e) {
    throw e;
    res.status(500).json({
      error: e.toString(),
    });
  }
}
