/**
 * src/pages/api/blog/index.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */
import { NextApiRequest, NextApiResponse } from "next";
import mongoConnect from "../../../lib/mongoConnect";
import BlogModel from "../../../lib/models/BlogModel";

export default async function handleRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await mongoConnect();

    res.status(200).json({
      blogs: await BlogModel.find(),
    });
  } catch (e) {
    res.status(500).json({
      error: e.toString(),
    });
  }
}
