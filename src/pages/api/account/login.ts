/**
 * src/pages/api/account/login.ts
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
import UserModel from "@/lib/models/UserModel";
import * as crypto from "crypto";
import createJwt from "@/lib/jwt";

export default async function handleRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({
      error: "Method not allowed",
    });
    return;
  }

  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).json({
      error: "Bad request",
    });
    return;
  }

  try {
    await mongoConnect();

    const user = await UserModel.findOne({
      username: req.body.username,
    });

    if (!user) {
      res.status(401).json({
        error: "Invalid credentials",
      });
      return;
    }

    if (
      user.passwordHash !==
      crypto.createHash("sha256").update(req.body.password).digest("hex")
    ) {
      res.status(401).json({
        error: "Invalid credentials",
      });
      return;
    }

    res.status(200).json({
      success: true,
      token: createJwt(req.body.username),
    });
  } catch (e) {
    res.status(500).json({
      error: e.toString(),
    });
  }
}
