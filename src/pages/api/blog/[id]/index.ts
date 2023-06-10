/**
 * src/pages/api/blog/[id]/index.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import { NextApiRequest, NextApiResponse } from "next";
import mongoConnect from "@/lib/mongoConnect";
import BlogModel from "@/lib/models/BlogModel";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await mongoConnect();

    const blog = await BlogModel.findById(req.query.id);

    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    res.status(200).json({ blog });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
