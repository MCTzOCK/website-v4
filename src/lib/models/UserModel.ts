/**
 * src/lib/models/UserModel.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 09.06.2023
 *
 */

import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: false,
  },
});

export default mongoose.models?.User || mongoose.model("User", UserModel);
