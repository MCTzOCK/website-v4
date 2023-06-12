/**
 * src/pages/api/projects/create.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 12.06.2023
 *
 */
import { NextApiRequest, NextApiResponse } from "next";
import mongoConnect from "@/lib/mongoConnect";
import jwt from "jsonwebtoken";
import UserModel from "@/lib/models/UserModel";
import BlogModel from "@/lib/models/BlogModel";
import PromotedProjectModel from "@/lib/models/PromotedProjectModel";

export default async function handleRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await mongoConnect();

    const decoded = jwt.verify(
      req.cookies.token as string,
      process.env.JWT_SECRET as string,
      {}
    ) as any;

    if (!decoded) {
      res.status(401).json({
        error: "Invalid token",
      });
      return;
    }

    const user = await UserModel.findOne({
      username: decoded.username,
    });

    if (!user) {
      res.status(401).json({
        error: "Invalid token",
      });
      return;
    }

    if (req.method !== "POST") {
      res.status(400).json({
        error: "Bad request",
      });
      return;
    }

    if (
      !req.body ||
      !req.body.name ||
      !req.body.image ||
      !req.body.description ||
      !req.body.website
    ) {
      res.status(400).json({
        error: "Bad request",
      });
      return;
    }

    const project = await PromotedProjectModel.create({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      website: req.body.website,
      sourceCode: req.body.sourceCode,
    });

    res.status(200).json({
      success: true,
      project,
    });
  } catch (e: any) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
}
