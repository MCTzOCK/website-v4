/**
 * src/pages/api/contact/get.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 11.06.2023
 *
 */
import { NextApiRequest, NextApiResponse } from "next";
import mongoConnect from "@/lib/mongoConnect";
import ContactModel from "@/lib/models/ContactModel";
import jwt from "jsonwebtoken";
import UserModel from "@/lib/models/UserModel";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
    const contacts = await ContactModel.find();

    res.status(200).json({ contacts });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
