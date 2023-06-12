/**
 * src/server/index.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 09.06.2023
 *
 */

import { config as dotenv } from "dotenv";
dotenv();

import next from "next";
import express from "express";
import mongoConnect from "../lib/mongoConnect";
import UserModel from "../lib/models/UserModel";
import * as crypto from "crypto";
import BlogModel from "../lib/models/BlogModel";
import mongoose from "mongoose";
import formidable from "formidable";
import * as fs from "fs";
import { randomBytes } from "crypto";
import PromotedProjectModel from "../lib/models/PromotedProjectModel";
import AwardModel from "../lib/models/AwardModel";
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(async () => {
  await mongoConnect();

  if (
    !(await UserModel.findOne({
      username: "admin",
    }))
  ) {
    let adminPassword = "";

    if (!process.env.DEFAULT_ADMIN_PASSWORD) {
      adminPassword = crypto.randomBytes(16).toString("hex");
    } else {
      adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    }

    await UserModel.create({
      username: "admin",
      passwordHash: crypto
        .createHash("sha256")
        .update(adminPassword)
        .digest("hex"),
    });

    console.log("Default admin user created:");
    console.log("Username: admin");
    console.log("Password: " + adminPassword);
  }

  if ((await BlogModel.countDocuments().exec()) === 0) {
    await BlogModel.create({
      title: "Hello World!",
      author: "Ben Siebert",
      content: "# Hello World!\n\nThis is a test blog post.",
      tags: ["test", "hello", "world"],
      image:
        "https://www.jugend-forscht.de/fileadmin/_processed_/2/f/csm_2023_ARB_008_download_f8f39dd0a0.jpg",
    });
  }

  if ((await PromotedProjectModel.countDocuments().exec()) === 0) {
    await PromotedProjectModel.create({
      name: "Example Project",
      image: "/decryptor.jpg",
      website: "https://ben-siebert.com",
      description: "This is an example project.",
      sourceCode: "https://github.com/MCTzOCK/website-v4",
    });
  }

  if ((await AwardModel.countDocuments().exec()) === 0) {
    await AwardModel.create({
      date: new Date(),
      project: (await PromotedProjectModel.find())[0]._id,
      title: "Example Award",
      description: "This is an example award.",
    });
  }

  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "images",
  });

  const server = express();

  server.post("/api/upload-image", async (req, res) => {
    const form = new formidable.IncomingForm();

    await new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(500).json({
            error: JSON.stringify(err),
          });
          return;
        }

        const file = files.image as formidable.File;

        if (!file) {
          res.status(400).json({
            error: "No image provided",
          });
          return;
        }

        const content = fs.readFileSync(file.filepath);
        const fileName = file.originalFilename as string;

        const uploadStream = bucket.openUploadStream(
          randomBytes(128).toString("hex") +
            "." +
            (fileName as string).split(".").pop()
        );

        uploadStream.write(content);

        uploadStream.end();

        await new Promise((resolve0) => {
          uploadStream.on("finish", () => {
            resolve0(true);
          });
        });

        res.status(200).json({
          success: true,
          url: "/api/image/" + uploadStream.id,
        });

        resolve(true);
      });
    });

    /*

    if (!(req.files && req.files.image)) {
      res.status(400).json({
        error: "No image uploaded",
      });
      return;
    }

    const image = req.files.image as fileUpload.UploadedFile;
    */
  });

  server.get("/api/image/*", (req, res) => {
    const id = req.url.split("/").pop();
    if (!id) {
      res.status(400).json({
        error: "No image id provided",
      });
      return;
    }

    res.setHeader("Content-Type", "image/png");

    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(id)
    );
    downloadStream.pipe(res);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  if (!process.env.PORT) {
    process.env.PORT = "3000";
  }

  server.listen(parseInt(process.env.PORT as string, 10), () => {
    console.log("> Ready on http://localhost:" + process.env.PORT);
  });
});
