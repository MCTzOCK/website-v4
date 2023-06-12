/**
 * src/pages/api/projects/index.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 12.06.2023
 *
 */
import { NextApiRequest, NextApiResponse } from "next";
import mongoConnect from "../../../lib/mongoConnect";
import PromotedProjectModel from "../../../lib/models/PromotedProjectModel";

export default async function handleRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await mongoConnect();

    res.status(200).json({
      projects: await PromotedProjectModel.find(),
    });
  } catch (e) {
    res.status(500).json({
      error: e.toString(),
    });
  }
}
