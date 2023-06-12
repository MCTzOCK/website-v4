/**
 * src/lib/models/PromotedProjectModel.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 12.06.2023
 *
 */
import mongoose from "mongoose";

const PromotedProjectModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  sourceCode: {
    type: String,
    required: false,
  },
});

export default mongoose.models?.PromotedProject ||
  mongoose.model("PromotedProject", PromotedProjectModel);
