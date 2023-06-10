/**
 * src/pages/api/contact/[id]/answer.tsx
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
import * as nodemailer from "nodemailer";
import { render } from "@react-email/render";
import EmailAdminNewContact from "@/components/EmailAdminNewContact";
import EmailContactMessage from "@/components/EmailContactMessage";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!req.body || !req.body.message) {
    res.status(400).json({ error: "Missing message" });
    return;
  }

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
    const contact = await ContactModel.findById(req.query.id);

    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }

    if (contact.answered) {
      res.status(400).json({ error: "Contact already answered" });
      return;
    }

    contact.answered = true;

    await contact.save();

    let transport = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      from: process.env.SMTP_FROM,
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transport.sendMail({
      from: "System @ben-siebert.com <" + process.env.SMTP_FROM + ">",
      to: contact.email,
      replyTo: process.env.SMTP_USER,
      subject: "Answer to your contact Request: " + contact.subject,
      html: await render(<EmailContactMessage message={req.body.message} />),
      text: "",
    });

    res.status(200).json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
