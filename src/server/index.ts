/**
 * src/server/index.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 09.06.2023
 *
 */

import next from "next";
import express from "express";

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  if (!process.env.PORT) {
    process.env.PORT = "3000";
  }

  server.listen(parseInt(process.env.PORT as string, 10), () => {
    console.log("> Ready on http://localhost:" + process.env.PORT);
  });
});
