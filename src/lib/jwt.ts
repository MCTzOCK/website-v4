/**
 * src/lib/jwt.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 09.06.2023
 *
 */

import jwt from "jsonwebtoken";

export default function createJwt(username: string): string {
  return jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
}
