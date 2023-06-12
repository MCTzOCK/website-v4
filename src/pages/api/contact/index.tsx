/**
 * src/pages/api/contact/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 11.06.2023
 *
 */
import { NextApiRequest, NextApiResponse } from "next";
import mongoConnect from "../../../lib/mongoConnect";
import ContactModel from "../../../lib/models/ContactModel";
import * as nodemailer from "nodemailer";
import { render } from "@react-email/render";
import EmailAdminNewContact from "@/components/EmailAdminNewContact";

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

  if (!req.body || !req.body.email || !req.body.subject || !req.body.message) {
    res.status(400).json({
      error: "Bad Request",
    });
    return;
  }

  try {
    await mongoConnect();

    const contact = await ContactModel.create({
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

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
      to: process.env.ADMIN_CONTACT_EMAIL,
      replyTo: process.env.SMTP_USER,
      subject: "New Contact Request: " + req.body.subject,
      html: await render(
        <EmailAdminNewContact
          email={req.body.email}
          message={req.body.message}
          subject={req.body.subject}
        />
      ),
      text: "",
    });

    res.status(200).json({
      success: true,
    });
  } catch (e: any) {
    res.status(500).json({
      error: e.toString(),
    });
  }
}
